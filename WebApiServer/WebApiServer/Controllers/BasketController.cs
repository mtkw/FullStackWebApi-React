using DataAccess.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace WebApiServer.Controllers
{
    public class BasketController(ApplicationDbContext context) : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasketById()
        {
            var basket = await RetrievBasket();

            if (basket == null)
            {
                return NoContent();
            }
            return Ok(basket);
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrievBasket();

            basket ??= CreateBasket();

            var productItem = await context.Products.FindAsync(productId);

            if (productItem == null)
            {
                return BadRequest("Problem addin item to basket");
            }

            basket.AddItem(productItem, quantity);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return CreatedAtAction(nameof(GetBasketById), basket);

            return BadRequest("Problem Updating Basket");
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
        {
            return Ok();
        }

        private async Task<Basket?> RetrievBasket()
        {
            return await context.Baskets
                        .Include(x => x.Items)
                        .ThenInclude(x => x.Product)
                        .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
        }

        private Basket CreateBasket()
        {
            var basketId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };
            Response.Cookies.Append("basketId", basketId, cookieOptions);
            var basket = new Basket
            {
                BasketId = basketId
            };
            context.Baskets.Add(basket);
            return basket;
        }
    }
}