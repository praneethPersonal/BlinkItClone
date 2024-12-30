

namespace BlinkIt.Repository.Interfaces
{
    public interface IBlinkItRepository
    {
        public List<Product> GetProductByCategoryFromRepo();

        public Product GetProduct(string productId);
    }
}
