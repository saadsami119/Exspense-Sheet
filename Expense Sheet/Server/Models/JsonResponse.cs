
namespace app.Server.Models
{
    public class JsonResponse
    {
        public bool Successful { get; set; }
        public string Error { get; set; }
        public object Data { get; set; }
    }
}