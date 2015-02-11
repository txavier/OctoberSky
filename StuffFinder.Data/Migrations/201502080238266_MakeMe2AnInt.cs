namespace StuffFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MakeMe2AnInt : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.thing", "me2", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.thing", "me2", c => c.String());
        }
    }
}
