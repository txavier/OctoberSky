namespace StuffFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrackAdminInUserTable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.adminMember", "userId", "dbo.user");
            DropIndex("dbo.adminMember", new[] { "userId" });
            AddColumn("dbo.user", "isAdmin", c => c.Boolean());
            DropTable("dbo.adminMember");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.adminMember",
                c => new
                    {
                        adminMemberId = c.Int(nullable: false, identity: true),
                        userId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.adminMemberId);
            
            DropColumn("dbo.user", "isAdmin");
            CreateIndex("dbo.adminMember", "userId");
            AddForeignKey("dbo.adminMember", "userId", "dbo.user", "userId");
        }
    }
}
