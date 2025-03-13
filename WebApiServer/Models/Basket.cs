namespace Models
{
    public class Basket
    {
        public int Id { get; set; }
        public required string BasketId { get; set; }
        public List<BasketItem> Items { get; set; } = [];

        public void AddItem(Product product, int quantity)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }
            if (quantity <= 0)
            {
                throw new ArgumentOutOfRangeException("Quantity shoudl be greater than zero ", nameof(quantity));
            }
            var existingItem = FindItem(product.Id);
            if (existingItem == null)
            {
                Items.Add(new BasketItem
                {
                    ProductId = product.Id,
                    Quantity = quantity,
                    Product = product
                });
            }
            else
            {
                existingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            if (quantity <= 0)
            {
                throw new ArgumentOutOfRangeException("Quantity shoudl be greater than zero ", nameof(quantity));
            }
            var item = FindItem(productId);
            if (item == null)
            {
                return;
            }
            item.Quantity -= quantity;
            if (item.Quantity <= 0)
            {
                Items.Remove(item);
            }
        }

        private BasketItem? FindItem(int productId)
        {
            return Items.FirstOrDefault(i => i.ProductId == productId);
        }
    }
}