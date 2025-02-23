using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Brand { get; set; }
        public required string Type { get; set; }
        public long Price { get; set; }
        public required string PictureUrl { get; set; }
        public int QuantityInStock { get; set; }
    }
}
