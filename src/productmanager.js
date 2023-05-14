import fs from "fs"

export class ProductManager {
    constructor(path) {
        this.path = path;
        if (fs.existsSync(path)) {
            const productsString = fs.readFileSync(this.path, "utf-8")
            const productsFile = JSON.parse(productsString)
            this.products = productsFile
        } else {
            fs.writeFileSync(path, "[]")
            this.products = []
        }
    }

    async addProduct(obj) {
        const data = await this.getProducts()
        if (obj) {
            if (data.find((product) => product.code === obj.code)) {
                return ("The product already exists");
            } else {
                data.push(
                    obj
                );
                const productsString = JSON.stringify(data, null, 2)
                await fs.promises.writeFile(this.path, productsString)
            }
        }
    }

    async getProducts() {
        const productsString = await fs.promises.readFile(this.path, "utf-8")
        const productsFile = JSON.parse(productsString)
        return productsFile
    }

    async getProductById(id) {
        const productsString = await fs.promises.readFile(this.path, "utf-8")
        const productsFile = JSON.parse(productsString)
        const product = productsFile.find((product) => product.id === id);
        if (product) {
            return product;
        } else {
            return ("No existe el producto");
        }
    }

    async updateProduct(id, object) {
        const productsString = await fs.promises.readFile(this.path, "utf-8")
        const productsFile = JSON.parse(productsString)
        const product = productsFile.find((product) => product.id == id);
        if (product) {
            const updateProduct = { ...product, ...object }
            const index = productsFile.indexOf(product)
            productsFile.splice(index, 1, updateProduct)
            const productsString = JSON.stringify(productsFile, null, 2)
            await fs.promises.writeFile(this.path, productsString)
            return product
        }
    }

    async deleteProduct(id) {
        const productsString = await fs.promises.readFile(this.path, "utf-8")
        const productsFile = JSON.parse(productsString)
        const product = productsFile.find((product) => product.id == id);
        if (product) {
            const index = productsFile.indexOf(product)
            productsFile.splice(index, 1)
            const productsString = JSON.stringify(productsFile, null, 2)
            await fs.promises.writeFile(this.path, productsString)
            return product
        }
    }
}