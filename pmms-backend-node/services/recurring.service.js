const RecurringItem = require('../models/RecurringItem');
const Jar = require('../models/Jar');
const Transaction = require('../models/Transaction');
const { addDays, addWeeks, addMonths, addYears } = require('date-fns');

const calculateNextDate = (frequency, dayOfExecution, currentDate = new Date()) => {
  switch (frequency) {
    case 'daily':
      return addDays(currentDate, 1);
    case 'weekly':
      return addWeeks(currentDate, 1);
    case 'monthly':
      const next = addMonths(currentDate, 1);
      return new Date(next.getFullYear(), next.getMonth(), dayOfExecution || 1);
    case 'yearly':
      return addYears(currentDate, 1);
    default:
      return addMonths(currentDate, 1);
  }
};

exports.executeRecurringItems = async () => {
  try {
    const now = new Date();

    // Find all active recurring items that are due
    const dueItems = await RecurringItem.find({
      isActive: true,
      nextExecutionDate: { $lte: now }
    }).populate('jarId');

    console.log(`Found ${dueItems.length} recurring items to execute`);

    for (const item of dueItems) {
      try {
        const jar = item.jarId;

        if (!jar) {
          console.error(`Jar not found for recurring item ${item._id}`);
          continue;
        }

        const previousAmount = jar.amount;
        let newAmount;

        if (item.type === 'income') {
          // Add to jar
          newAmount = previousAmount + item.amount;
        } else {
          // Subtract from jar (expense)
          if (previousAmount < item.amount) {
            console.warn(`Insufficient funds in jar ${jar.name} for recurring expense ${item.name}`);
            continue;
          }
          newAmount = previousAmount - item.amount;
        }

        // Update jar
        jar.amount = newAmount;
        await jar.save();

        // Create transaction
        await Transaction.create({
          userId: item.userId,
          jarId: jar._id,
          type: item.type === 'income' ? 'add' : 'subtract',
          amount: item.amount,
          previousAmount,
          newAmount,
          reason: `Recurring ${item.type}: ${item.name}`
        });

        // Update recurring item
        item.lastExecutionDate = now;
        item.nextExecutionDate = calculateNextDate(item.frequency, item.dayOfExecution, now);
        await item.save();

        console.log(`✅ Executed recurring item: ${item.name}`);
      } catch (error) {
        console.error(`Error executing recurring item ${item._id}:`, error);
      }
    }

    return { executed: dueItems.length };
  } catch (error) {
    console.error('Error in executeRecurringItems:', error);
    throw error;
  }
};
