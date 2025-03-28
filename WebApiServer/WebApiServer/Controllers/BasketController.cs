using DataAccess.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using WebApiServer.DTO;
using WebApiServer.Extensions;

namespace WebApiServer.Controllers
{
    public class BasketController(ApplicationDbContext context) : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrievBasket();

            if (basket == null)
            {
                return NoContent();
            }
            return basket.ToDto();

        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
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

            if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());

            return BadRequest("Problem Updating Basket");
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
        {
            var basket = await RetrievBasket();

            if (basket == null)
            {
                return BadRequest("Problem removing item from basket or your basket is empty");
            }
            var productItem = await context.Products.FindAsync(productId);

            if (productItem == null)
            {
                return BadRequest("Problem removing item from basket");
            }

            basket.RemoveItem(productId, quantity);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());
            return BadRequest("Problem Updating Basket");
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