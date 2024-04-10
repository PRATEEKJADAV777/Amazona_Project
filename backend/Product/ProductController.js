const productModel = require("./ProductModel")

class ProductController {

  // async InserProduct(req, res) {

  //   try {
  //     const result = await productModel.insertMany(products)
  //     if (result) return res.status(200).send({ message: "Succcesss", result: result })
  //     return res.status(500).send({ message: "Somthing Went Wrong " })
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send({ message: "Internal Sever Error" })
  //   }
  // }

  async GetProduct(req, res) {
    try {
      let result = await productModel.GetProducts()
      let UpdateResult = result.map(data => ({
        ...data._doc,
        FeatureImages: data.FeatureImages ? {
          ...data.FeatureImages,
          url: `https://localhost:5100${data.FeatureImages.path}`
        } : null
      }))
      // UpdateResult  = await UpdateResult.category 

      if (result) return res.status(200).send({ message: "Success", Product: UpdateResult })
      res.cookie('IP', IP)
      return res.status(500).send({ message: "Somthiong Went Wrong" })
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Sever Error" })
    }
  }

  async GetProductById(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(200).send({ message: "Product Not Found" })
      }
      let result = await productModel.GetproductById(id)
      result = { ...result._doc, FeatureImages: result.FeatureImages.url = `https://localhost:5100${result.FeatureImages.path}` }
      if (result) return res.status(200).send({ message: "Success", product: result })
      return res.status(500).send({ message: "Somthing Went Wrong " })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: "Internal Server Error" })
    }
  }

  async GetCart(req, res) {
    try {

      const { products } = req.body

      if (!products) return res.status(400).send({ message: "Missing Dipendacy Products" })

      // const cart = await productModel.find({ _id: products }).select(["name", "image", "price", "_id", "category", "type", "countInStock", "brand"])
      let cart = await productModel.GetAddToCart(products)
      console.log(cart);
      
      let UpdateResult = cart.map(data => ({
        ...data._doc,
        FeatureImages: data.FeatureImages ? {
          ...data.FeatureImages,
          url: `https://localhost:5100${data.FeatureImages.path}`
        } : null
      }))

      // .find({ _id: products }).select(["name", "image", "price", "_id", "category", "type", "countInStock", "brand"])


      if (!cart) return res.status(500).send({ message: "Somthing Went Wrong " })

      return res.status(200).send({ message: "Success", cart: UpdateResult })


    } catch (error) {
      console.log(error);

      return res.status(500).send({ message: "Internal Server Error" })
    }
  }

  ////////////////////////////////////////////////ADMIN CONTROLLER/////////////////////////////////////////

  async InsertProducts(req, res) {
    try {

      const { title, price, description, discount, countInStock, totalPrice, Brand, FeatureImages, RelevantImages, alias } = req.body
      if (!title) return res.status(400).send({ message: "Missing Dipendency Of Title" })
      if (!price) return res.status(400).send({ message: "Missing Dipendency Of Price" })
      if (!alias) return res.status(400).send({ message: "Missing Dipendency Of Alias" })
      if (!description) return res.status(400).send({ message: "Missing Dipendency Of description" })
      if (!discount) return res.status(400).send({ message: "Missing Dipendency Of Discount" })
      if (!countInStock) return res.status(400).send({ message: "Missing Dipendency Of CountInStock" })
      if (!totalPrice) return res.status(400).send({ message: "Missing Dipendency Of TotalPrice" })
      if (!Brand) return res.status(400).send({ message: "Missing Dipendency Of Brand" })
      if (!FeatureImages) return res.status(400).send({ message: "Missing Dipendency Of FeatureImages" })
      if (!RelevantImages) return res.status(400).send({ message: "Missing Dipendency Of RelevantImages" })

      const result = await productModel.AddProduct(req.body)

      if (!result) return res.status(400).send({ message: "Somthing Went Wrong" })

      return res.status(200).send({ message: "Success", product: result })

    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: "Internal Server Error" })
    }
  }

  async GETProducts(req, res) {
    try {
      const Result = await productModel.GetProducts()
      if (Result) return res.status(200).send({ message: "Success", Result })
      return res.status(400).send({ message: "Somthing Went Worng" })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: "Internal Server Erorr" })
    }
  }

  async GetProductbyId(req, res) {
    try {
      const { id } = req.params
      let result = await productModel.GetAdminProductByID(id)
      result = result._doc
      result.FeatureImages = result.FeatureImages
      result.FeatureImages.url = `https://localhost:5100${result.FeatureImages.path}`
      delete result.FeatureImages.path
      if (result) return res.status(200).send({ message: "Succcess", result })
      return res.status(400).send({ message: "Somthing Went Wrong" })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: "Somthing Went Wrong" })
    }
  }

  async UpdateProduct(req, res) {
    try {
      const { id } = req.params
      const { body } = req
      const result = await productModel.UpdateProduct(id, body)
      if (result.modifiedCount > 0 || result.matchedCount > 0) return res.status(200).send({ message: "Success", result: result })
      return res.status(400).send({ message: "Somthing Went Wrong" })
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" })
    }
  }

  async DeleteProduct(req, res) {
    try {
      const { id } = req.params
      const result = await productModel.DeleteProduct(id)
      if (result) {
        return res.status(200).send({ message: "Success" })
      } else {
        return res.status(400).send({ message: "Something Went Wrong" })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal Server Error" })
    }
  }



}

const productController = new ProductController()
module.exports = productController

