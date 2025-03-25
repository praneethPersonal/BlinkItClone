using BlinkIt.Repository.Models;

namespace BlinkIt.Service.Interfaces
{
    public  interface IProductService
    {
        public List<Product> GetProductByCategory();

        public Product GetProductDetails(string productId);
    }
}
