/* eslint-disable prefer-arrow-callback */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    const user2 = {
      name: "Random user",
      username: "random",
      password: "helloworld",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user2);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.visit("http://localhost:3000");
    cy.contains("log in to application");
    cy.contains("username");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Matti Luukkainen logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("wrong");
      cy.get("#password").type("sasdfasdf");
      cy.get("#login-button").click();
      cy.contains("wrong username or password");
      cy.get(".error-message")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", "Matti Luukkainen logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("a blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#input-title").type("The best blog in the world");
      cy.get("#input-author").type("Random person");
      cy.get("#input-url").type("www.randompersonblog.com");
      cy.get("#create-blog-button").click();
      cy.get("html").contains("The best blog in the world Random person");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.contains("new blog").click();
        cy.createNote({
          title: "The best blog in the world",
          author: "Random person",
          url: "www.randompersonblog.com",
        });
      });

      it("a blog can be liked", function () {
        cy.contains("view").click();
        cy.contains("like").click();
        cy.get("html").contains("likes 1");
      });

      it("and creator, a blog can be deleted", function () {
        cy.contains("view").click();
        cy.contains("remove").click();
        cy.get("html").should(
          "not.contain",
          "The best blog in the world Random person",
        );
      });

      it("and not creator, a blog cannot be deleted", function () {
        cy.contains("logout").click();
        cy.get("#username").type("random");
        cy.get("#password").type("helloworld");
        cy.get("#login-button").click();
        cy.contains("view").click();
        cy.get(".remove-blog-button").should("have.css", "display", "none");
      });
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        const blogs = [
          {
            title: "Random blog 1",
            author: "Random author 1",
            url: "randomurl.com/blog1",
          },
          {
            title: "Random blog 2",
            author: "Random author 2",
            url: "randomurl.com/blog2",
          },
          {
            title: "Random blog 3",
            author: "Random author 3",
            url: "randomurl.com/blog3",
          },
        ];
        blogs.forEach((blog) => {
          cy.createNote(blog);
        });
      });

      it("blogs are ordered with most likes being first", function () {
        cy.contains("Random blog 1").find(".view-blog-button").click();
        cy.contains("Random blog 2").find(".view-blog-button").click();
        cy.contains("Random blog 3").find(".view-blog-button").click();

        cy.contains("Random blog 3").find(".like-blog-button").click();
        cy.contains("Random blog 3").find(".like-blog-button").click();
        cy.contains("Random blog 3").find(".like-blog-button").click();
        cy.contains("Random blog 1").find(".like-blog-button").click();
        cy.contains("Random blog 1").find(".like-blog-button").click();
        cy.contains("Random blog 2").find(".like-blog-button").click();

        cy.get(".blog").eq(0).should("contain", "Random blog 3");
        cy.get(".blog").eq(1).should("contain", "Random blog 1");
      });
    });
  });
});
