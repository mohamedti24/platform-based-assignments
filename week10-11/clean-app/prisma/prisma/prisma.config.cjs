console.log(">>> Prisma config loaded <<<");

const { defineConfig } = require("@prisma/config");

module.exports = defineConfig({
  datasource: {
    provider: "sqlite",
    url: "file:./dev.db",
  },
});
