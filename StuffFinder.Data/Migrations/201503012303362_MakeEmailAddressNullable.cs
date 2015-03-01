namespace StuffFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MakeEmailAddressNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.user", "email", c => c.String(maxLength: 256));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.user", "email", c => c.String(nullable: false, maxLength: 256));
        }
    }
}
