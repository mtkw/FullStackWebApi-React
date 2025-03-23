using System;

namespace WebApiServer.DTO
{
    public class BasketDto
    {
        public required string BasketId { get; set; }
        public List<BasketItemDto> Items { get; set; } = [];
    }
}