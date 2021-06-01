const Meal = require("./models/meals");
const Order = require("./models/orders");
const graphql = require("graphql");
const OrderItem = require("./models/orderItem");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const mealType = new GraphQLObjectType({
  name: "Meal",
  description: "this is the meal info",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    imageLink: { type: GraphQLString },
    active: { type: GraphQLInt },
    created_at: { type: GraphQLString },
  }),
});

const orderType = new GraphQLObjectType({
  name: "Order",
  description: "order details",
  fields: () => ({
    id: { type: GraphQLID },
    userName: { type: GraphQLString },
    userPhone: { type: GraphQLString },
    userAddress: { type: GraphQLString },
    totalPrice: { type: GraphQLInt },
    orderDate: { type: GraphQLString },
    orderItems: {
      type: GraphQLList(orderItemType),
    },
  }),
});

const orderItemType = new GraphQLObjectType({
  name: "OrderItem",
  description: "order item details",
  fields: () => ({
    itemPrice: { type: GraphQLInt },
    itemQuantity: { type: GraphQLInt },
    totalPrice: { type: GraphQLInt },
    itemId: { type: GraphQLID },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    //// meals queries start .. working
    meals: {
      type: new GraphQLList(mealType),
      resolve: async () => {
        return await Meal.find();
      },
    },
    mealById: {
      type: mealType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        return await Meal.findById(args.id);
      },
    },
    mealByName: {
      type: mealType,
      args: { name: { type: GraphQLString } },
      resolve: async (parent, args) => {
        try {
          const res = await Meal.find({}).where({ name: args.name });
          console.log(res); //// the result is here but isn't show up on graphql
          return res;
        } catch (error) {
          console.log("error: ", error);
        }
      },
    },
    //// meals queries End
    orders: {
      type: new GraphQLList(orderType),
      resolve: async () => {
        try {
          const res = await Order.find();
          console.log("res: ", res);
          return res;
        } catch (error) {
          console.log("Error:", error);
        }
      },
    },
    orderById: {
      type: orderType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        try {
          return await Order.findById(args.id);
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    },
  },
});

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addMeal: {
      // working fine
      type: mealType,
      description: "add a meal: name, price, active",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLInt) },
        active: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        try {
          let meal = new Meal(args);
          return await meal.save();
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    },

    ////// must redo for new DB schema ////
    // addOrder: {
    //   // works fine
    //   type: orderType,
    //   description:
    //     "add an order (userName, userPhone, userAddress, totalPrice)",
    //   args: {
    //     userName: { type: GraphQLString },
    //     userPhone: { type: GraphQLString },
    //     userAddress: { type: GraphQLString },
    //     totalPrice: { type: GraphQLInt },
    //     //  orderItems: { type: GraphQLList(orderItemType) },
    //   },
    //   resolve: async (parent, args) => {
    //     try {
    //       let order = new Order(args);
    //       return await order.save();
    //     } catch (error) {
    //       console.log("Error: ", error);
    //     }
    //   },
    // },
  }),
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
