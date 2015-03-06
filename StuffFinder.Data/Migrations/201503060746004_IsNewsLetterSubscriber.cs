namespace StuffFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IsNewsLetterSubscriber : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.user", "isNewsletterSubscriber", c => c.Boolean());
        }
        
        public override void Down()
        {
            DropColumn("dbo.user", "isNewsletterSubscriber");
        }
    }
}
