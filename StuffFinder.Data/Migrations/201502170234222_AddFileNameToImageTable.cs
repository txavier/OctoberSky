namespace StuffFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddFileNameToImageTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.image", "fileName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.image", "fileName");
        }
    }
}
