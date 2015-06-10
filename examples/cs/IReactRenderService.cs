using System.Web;

namespace MyApp.Services
{
    public interface IReactRenderService
    {
        HtmlString RenderToString(string component, object model);

        HtmlString RenderToStaticMarkup(string component, object model);
    }
}