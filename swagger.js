const m2s = require("mongoose-to-swagger");
const User = require("./models/user.model");
// const Product = require("./models/product.model");

exports.options = {
  components: {
    schemas: {
      User: m2s(User),
      //   Product: m2s(Product),
    },
  },
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "Products CRUD API",
    description: "Products Project Application",
  },
  contact: {
    name: "API Support",
    url: "http://www.example.com/support",
    email: "test@email.com",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
    {
      url: "https://api.example.com",
      description: "Production server",
    },
  ],
  tags: [
    {
      name: "users",
      description: "API for users in the system",
    },
    {
      name: "products",
      description: "API for products in the system",
    },
    {
      name: "user-products",
      description: "API for user-products in the system",
    },
  ],
  paths: {
    "/api/users": {
      get: {
        tags: ["users"],
        summary: "Get all users",
        responses: {
          200: {
            description: "OK",
          },
        },
      },
      post: {
        tags: ["users"],
        summary: "Create new user",
        requestBody: {
          description: "User that we want to create",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  password: { type: "string" },
                  name: { type: "string" },
                  surname: { type: "string" },
                  email: { type: "string" },
                  address: {
                    type: "object",
                    properties: {
                      area: { type: "string" },
                      road: { type: "string" },
                    },
                  },
                  phone: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        type: { type: "string" },
                        number: { type: "number" },
                      },
                    },
                  },
                },
                required: ["username", "password", "email"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
          },
        },
      },
    },
    "/api/users/{username}": {
      get: {
        tags: ["users"],
        summary: "Get user by username",
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of user to return",
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      patch: {
        tags: ["users"],
        summary: "Update user by username",
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of user to update",
            type: "string",
          },
        ],
        requestBody: {
          description: "User that we want to update",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  name: { type: "string" },
                  surname: { type: "string" },
                  email: { type: "string" },
                  address: {
                    type: "object",
                    properties: {
                      area: { type: "string" },
                      road: { type: "string" },
                    },
                  },
                  phone: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        type: { type: "string" },
                        number: { type: "number" },
                      },
                    },
                  },
                },
                required: ["email"],
              },
            },
          },
          responses: {
            200: {
              description: "OK",
            },
          },
        },
      },
      delete: {
        tags: ["users"],
        summary: "Delete user by username",
        parameters: [
          {
            name: "username",
            in: "path",
            description: "Username of user to delete",
            schema: {
              $ref: "#/components/schemas/User",
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
        },
      },
    },
    "/api/users-products/": {
      get: {
        tags: ["user-products"],
        summary: "Get all users-products",
        description: "Get all users-products",
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      post: {
        tags: ["user-products"],
        summary: "Create new user-product",
        description: "Create new user-product",
        requestBody: {
          description: "User-product that we want to create",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  products: {
                    type: "array",
                    items: {
                      type: "objects",
                      properties: {
                        product: { type: "string" },
                        cost: { type: "number" },
                        quantity: { type: "number" },
                      },
                    },
                  },
                },
                required: ["quantity"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
          },
        },
      },
    },
    "/api/users-products/{username}": {
      get: {
        tags: ["user-products"],
        parameters: [
          {
            name: "username",
            in: "path",
            description: "Username of user-product to return",
            required: true,
          },
        ],
        description: "Get user-product by username",
        summary: "Get user-product by username",
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      patch: {
        tags: ["user-products"],
        description: "Update user-product by username",
        requestBody: {
          description: "User-product that we want to update",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  product: {
                    type: "object",
                    properties: {
                      _id: { type: "string" },
                      quantity: { type: "number" },
                    },
                  },
                },
                required: ["quantity"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
          },
        },
      },
    },
    "/api/users-products/{username}/products/{product}": {
      delete: {
        tags: ["user-products"],
        description: "Delete user-product by username",
        parameters: [
          {
            name: "username",
            in: "path",
            description: "Username of user-product to delete",
            required: true,
          },
          {
            name: "product",
            in: "path",
            description: "Product of user-product to delete",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
        },
      },
    },
  },
};
