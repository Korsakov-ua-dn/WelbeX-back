import OrderService from "./OrderService.js";

class OrderController {
    async create(req, res) {
        try {
            const order = await OrderService.create(req.body)
            res.json({
                "RequestId": order._id
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const { page = 1, count = 6, filterName, filterCondition, filterValue, sortName = "date" } = req.query;

            // if ( filterName == 'amount' || filterName == 'distance' ) {
            //     filterValue = Number(filterValue);
            // }

            const orders = await OrderService.getAll(page, count, filterName, filterCondition, filterValue, sortName);
            return res.json(orders);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const order = await OrderService.getOne(req.params.id)
            return res.json(order)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const updatedOrder = await OrderService.update(req.body);
            return res.json(updatedOrder);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const order = await OrderService.delete(req.params.id);
            return res.json(order)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


export default new OrderController();
