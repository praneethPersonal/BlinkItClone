using Microsoft.AspNetCore.Mvc;
using BlinkIt.Service.Interfaces;

namespace BlinkIt.Gateway.Controllers
{
    [ApiController]
    [Route("api/blinkit/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("products")]
        public IActionResult GetProductsByCategory()
        {
            var products = _productService.GetProductByCategory();

            if (products == null)
            {
                return NotFound("Product not found.");
            }
            return Ok(products);
        }
        [HttpGet("product")]
        public IActionResult GetProductDetails([FromQuery] string productName)
        {
            var product = _productService.GetProductDetails(productName);
            if (product == null)
            {
                return NotFound("Product not found.");
            }
            return Ok(product);
        }
    }
}
