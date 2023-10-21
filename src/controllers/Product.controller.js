const Product = require('../models/Product.model')

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body)
        const resp = await product.save()
        return res.json({
            message: 'Product was created successfully',
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const resp = await Product.find().populate('category')
        return res.json({
            message: 'Products',
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const newData = req.body
        const resp = await Product.findByIdAndUpdate(
            newData._id,
            { $set: newData },
            { new: true }
        )
        return res.json({
            message: "Product was updated successfully",
            detail: resp
        })

    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const resp = await Product.findByIdAndDelete(req.body._id)

        return res.json({
            message: "Product was deleted successfully",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
}