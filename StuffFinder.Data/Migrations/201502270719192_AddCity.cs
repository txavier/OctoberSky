namespace StuffFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCity : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.location", "city", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.location", "city");
        }
    }
}
