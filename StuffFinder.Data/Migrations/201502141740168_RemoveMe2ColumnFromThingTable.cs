namespace StuffFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveMe2ColumnFromThingTable : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.thing", "me2");
        }
        
        public override void Down()
        {
            AddColumn("dbo.thing", "me2", c => c.Int(nullable: false));
        }
    }
}
