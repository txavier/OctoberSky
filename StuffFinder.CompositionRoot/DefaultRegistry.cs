using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.CompositionRoot
{
    public class DefaultRegistry
    {
        public DefaultRegistry()
        {
            Scan(
                scan =>
                {
                    scan.TheCallingAssembly();
                    scan.WithDefaultConventions();
                });

            For<DbContext>().HybridHttpOrThreadLocalScoped().Use<LiteratureAssistantDbContext>();

            For(typeof(IService<>)).Use(typeof(Service<>));

            For(typeof(IRepository<>)).Use(typeof(Repository<>));

            For<IItemService>().Use<ItemService>();

            For<IUserService>().Use<UserService>();

            For<IOrderService>().Use<OrderService>();

            For<ICountService>().Use<CountService>();

            //For<IUserStore<MyUser>>().Use<MyUserStore>();

            //For<UserStore<MyUser>>().Use<MyUserStore>();

            //For<UserManager<MyUser>>().Use<MyUserManager>();

            For(typeof(IUserStore<>)).Use(typeof(UserStore<>));

            Policies.SetAllProperties(prop => prop.OfType<IService<item>>());

            Policies.SetAllProperties(prop => prop.OfType<IService<itemAttribute>>());

            Policies.SetAllProperties(prop => prop.OfType<IService<templateAttribute>>());

            Policies.SetAllProperties(prop => prop.OfType<IItemService>());

            Policies.SetAllProperties(prop => prop.OfType<IUserService>());

            Policies.SetAllProperties(prop => prop.OfType<IOrderService>());

            Policies.SetAllProperties(prop => prop.OfType<IUserStore<ApplicationUser>>());
        }
    }
}
