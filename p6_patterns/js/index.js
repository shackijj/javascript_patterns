(function()  {

    // Classic pattern 1 - default pattern
    function inherit(C, P) {
        C.prototype = new P();
    }

    function Parent(name) {
        this.name = name || "Adam";
    }

    Parent.prototype.say = function() {
        return this.name;
    }

    function Child(name) {}

    inherit(Child, Parent);

    var kid = new Child();
    kid.name = "Test";
    kid.say(); // Test
    delete kid.name;
    kid.say(); // Adam

    // Drawback
    var kidSeth = new Child("Seth");
    kidSeth.say(); // Adam 

}());

(function()  {

    // Classic pattern 2 - constructor stealing
    function Parent(name) {
        this.name = name || "Adam";
    }

    Parent.prototype.say = function() {
        return this.name;
    }

    function Child(name) {
        Parent.apply(this, arguments);
    }

    var kid = new Child('Seth');
    kid.name;  // Seth

    // Difference with pattern 1
    function Article() {
        this.tags = ['js', 'css'];
    }

    var article = new Article();

    function BlogPost() {}

    BlogPost.prototype = article;

    var blog = new BlogPost();

    function StaticPage() {
        Article.call(this);
    }

    var page = new StaticPage();

    article.hasOwnProperty('tags'); // true
    blog.hasOwnProperty('tags'); // false
    alert(page.hasOwnProperty('tags')); // true

    // Multiple inheritnce 

    function Bird() {
        this.wings = 2;
        this.fly = true;
    }

    function Cat() {
        this.legs = 4;
        this.say = function() {
            return "Meow!";
        }
    }

    function CatBird() {
        Bird.apply(this);
        Cat.apply(this);
    }

    var cb = new CatBird();

    console.log(cb);
}());