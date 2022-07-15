import Order from "./Order.js";

class OrderService {
    async create(order) {
        const createdOrder = await Order.create({...order});
        return createdOrder;
    }

    async getAll(page, count, filterName, filterCondition, filterValue, sortName) {

        let orders;

        // сортировка по названию колонки по возрастанию
        let sort = {};
        sort[sortName] = 'asc';

        // выбор фильтра по условию
        let filter = {};

        const AllFilterParams = filterName && filterCondition && filterValue;

        if ( filterName == 'amount' || filterName == 'distance' && filterCondition == 'contain' && AllFilterParams) {

            let temp = await Order.find(filter, {__v: false}, {
                limit: Number(count), 
                sort, 
                skip: (page - 1) * count,
            });

            orders = temp.filter(e => {
                let arrOfNumbers = Array.from(String(e[filterName]));
                return arrOfNumbers.find(i => i == filterValue);
            });

        } else {
            switch (filterCondition) {
                case '=':
                    filter[filterName] = filterValue
                    break;
                case '>':
                    filter[filterName] = { $gt: filterValue}
                    break;
                case '<':
                    filter[filterName] = { $lt: filterValue}
                    break;
                case 'contain':
                    filter[filterName] = { $regex: `^.*${filterValue}.*`, $options: 'i' }
            }

            orders = await Order.find(filter, {__v: false}, {
                limit: Number(count), 
                sort, 
                skip: (page - 1) * count,
            });
        }

        const totalCount = await Order.countDocuments(filter);

        return {orders, totalCount};
    }

    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const order = await Order.findById(id);
        return order;
    }

    async update(order) {
        if (!order._id) {
            throw new Error('не указан ID')
        }
        const updatedOrder = await Order.findByIdAndUpdate(order._id, order, {new: true})
        return updatedOrder;
    }

    async delete(id) {
            if (!id) {
                throw new Error('не указан ID')
            }
            const order = await Order.findByIdAndDelete(id);
            return order;
    }
}

export default new OrderService();