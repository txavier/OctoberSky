namespace StuffFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FindingIsOptionalOnCommentTable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.comment", "findingId", "dbo.finding");
            DropIndex("dbo.comment", new[] { "findingId" });
            AlterColumn("dbo.comment", "findingId", c => c.Int());
            CreateIndex("dbo.comment", "findingId");
            AddForeignKey("dbo.comment", "findingId", "dbo.finding", "findingId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.comment", "findingId", "dbo.finding");
            DropIndex("dbo.comment", new[] { "findingId" });
            AlterColumn("dbo.comment", "findingId", c => c.Int(nullable: false));
            CreateIndex("dbo.comment", "findingId");
            AddForeignKey("dbo.comment", "findingId", "dbo.finding", "findingId", cascadeDelete: true);
        }
    }
}
