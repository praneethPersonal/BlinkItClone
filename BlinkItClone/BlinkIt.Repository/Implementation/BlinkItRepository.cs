using BlinkIt.Repository.Interfaces;
using BlinkIt.Repository.Models;
using MongoDB.Driver;

namespace BlinkIt.Repository.Implementation;

public class BlinkItRepository : IBlinkItRepository
{
    private readonly IMongoDatabase _database;

    public BlinkItRepository()
    {
        var client = new MongoClient("mongodb://praneeth:blinkit@localhost:27017/mydatabase?authSource=admin");
        _database = client.GetDatabase("blinkit");
    }

    public List<Product> GetProductByCategoryFromRepo()
    {
        var products = _database.GetCollection<Product>("products");
        var productsByCategory = products.Find(iter => true).ToList(); 
        return productsByCategory;
    }

    public Product GetProduct(string productName)
    {
        var products = _database.GetCollection<Product>("products");
        var product = products.Find(iter => iter.product_name == productName).ToList();
        if (product.Any())
        {
            var firstProduct = product.First();
            return firstProduct;
        }
        
        return null;
    }
    
    public List<Category> GetCategoryFromRepo()
    {
        var categories = _database.GetCollection<Category>("categories");
        return categories.Find(_ => true).ToList();
    }
    
}