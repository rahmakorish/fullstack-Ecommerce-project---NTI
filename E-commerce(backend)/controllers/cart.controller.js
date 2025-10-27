const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

exports.createCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const items = req.body.items;
    //check if user already have a cart
    let userCart = await Cart.findOne({ user: userId });
    //if user doesn't have cart => create it & add first product?
    if (!userCart) {
      userCart = await Cart.create({ user: userId, items: [] });
    }

    //loop over products and do things
    for (const item of items) {
      const productId = item.productId;
      const quantity = item.quantity;

      // Check if product exists in products
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ message: `${productId} not found` });
      }

      //user have a cart checked, does it have  the same product??
      const productInCart = userCart.items.find(
        (item) => item.product.toString() === productId
      );

      if (productInCart) {
        //user have it => increase quantity & update price
        productInCart.quantity += quantity;
      } else {
        // Add new product to existing cart
        userCart.items.push({ product: productId, quantity });
      }
    }
    //calculate products price outside loop
    let total = 0;
    for (const item of userCart.items) {
      const product = await Product.findById(item.product);
      total += product.price * item.quantity;
    }
    userCart.totalItemsPrice = total;
    await userCart.save();
    // message: `Cart created or updated successfully :)`,

    res.status(200).json(userCart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
//Retrive cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    //check if user already have a cart (not populated yet)
    let userCart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price imgURL"
    );
    // .populate('items.product', 'name price');
    if (!userCart) {
      return res.status(404).json({
        message: `User doesn't have a cart, start adding items to your cart now!`,
      });
    }
    //populate cart
    // console.log(userCart.items);

    return res.status(200).json(userCart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
//clear item from cart
exports.removeItem = async (req, res) => {
  //   try {
  const userId = req.user._id;
  const productId = req.params.id;

  // Check if user has a cart
  let userCart = await Cart.findOne({ user: userId });
  if (!userCart) {
    return res.status(404).json({
      message: `User doesn't have a cart, start adding items to your cart now!`,
    });
  }

  // Check if item exists in cart (works for populated or unpopulated product)
  const getProductId = (item) => {
    if (!item || !item.product) return null;
    // when populated, product may be an object with _id
    if (item.product._id) return item.product._id.toString();
    // otherwise item.product is likely an ObjectId or string
    return item.product.toString();
  };

  const itemExists = userCart.items.find(
    (item) => getProductId(item) === productId
  );
  if (!itemExists) {
    return res.status(404).json({ message: `Product isn't in your cart!` });
  }

  // Filter out the item to remove
  userCart.items = userCart.items.filter(
    (item) => getProductId(item) !== productId
  );

  // Recalculate total price
  let total = 0;
  for (const item of userCart.items) {
    const product = await Product.findById(item.product);
    if (product) {
      total += product.price * item.quantity;
    }
  }

  userCart.totalItemsPrice = total;
  await userCart.save();

  return res.status(200).json({
    message: "Item removed from cart successfully",
    cart: userCart,
  });
  //   }
  //    catch (err) {
  //     return res.status(500).json({ message: err.message });
  //   }
};
