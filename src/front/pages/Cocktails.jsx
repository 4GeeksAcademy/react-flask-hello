import React from "react";
import Cocktail from "./Cocktail";

const cocktails = [
  {
    name: "Virgin Mojito",
    image_url: "https://aromaticessence.co/wp-content/uploads/2022/05/virhin_mojito_4.jpg",
    glass_type: "Highball glass",
    alcoholic: "No",
    ingredients: [
      { item: "Fresh mint leaves", quantity: "10 leaves" },
      { item: "Sugar", quantity: "1 tsp" },
      { item: "Fresh lime juice", quantity: "1 oz" },
      { item: "Soda water", quantity: "Top up" },
      { item: "Ice", quantity: "As needed" },
      { item: "Mint sprig", quantity: "For garnish" },
    ],
    instructions:
      "Muddle mint leaves and sugar in a glass. Add lime juice, fill the glass with ice, and top with soda water. Stir gently and garnish with a mint sprig.",
  },
  {
    name: "Citrus Cooler",
    image_url: "https://www.tasteofhome.com/wp-content/uploads/2018/01/exps22973_CB50843D45-1.jpg",
    glass_type: "Collins glass",
    alcoholic: "No",
    ingredients: [
        {item: "Orange juice", "quantity": "3 oz"},
        {item: "Lemon juice", "quantity": "1 oz"},
        {item: "Honey", "quantity": "1 tsp"},
        {item: "Soda water", "quantity": "2 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Orange slice", "quantity": "For garnish"}
    ],
    instructions: "Combine orange juice, lemon juice, and honey in a glass. Stir well, add ice, and top with soda water. Garnish with an orange slice."
},
{
    name: "Lavender Lemonade",
    image_url: "https://th.bing.com/th/id/R.faf58f27ee89efa7fd832ecea729da22?rik=p67LqYnE%2b1R1aA&riu=http%3a%2f%2fwww.thecookierookie.com%2fwp-content%2fuploads%2f2015%2f02%2flavender-lemonade-2.jpg&ehk=JbtewtxCA5jlc%2bQo6iPtXhXJgybW3408P8wIN94%2bHy0%3d&risl=&pid=ImgRaw&r=0",
    glass_type: "Pitcher or Collins glass",
    alcoholic: "No",
    ingredients: [
        {item: "Fresh lemon juice", "quantity": "2 oz"},
        {item: "Lavender syrup", "quantity": "0.5 oz"},
        {item: "Water", "quantity": "4 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Lemon wheel", "quantity": "For garnish"}
    ],
    instructions: "Combine lemon juice, lavender syrup, and water in a pitcher or glass. Stir well, add ice, and garnish with a lemon wheel."
},{
    name: "Peach Iced Tea",
    image_url: "https://1.bp.blogspot.com/-8oErM9Ut5RQ/XueZzUGyb2I/AAAAAAAAYOs/xwQsI1yUXP4kLRMbAatwHJyJqV0eSWOSACK4BGAsYHg/d/peach%2Biced%2Btea%2Brecipe%2B%25282%2529.jpg",
    glass_type: "Highball glass",
    alcoholic: "No",
    ingredients: [
        {item: "Strong black tea", "quantity": "4 oz"},
        {item: "Peach puree", "quantity": "2 oz"},
        {item: "Honey", "quantity": "1 tsp"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Mint sprig", "quantity": "For garnish"}
    ],
    instructions: "Combine black tea, peach puree, and honey in a glass or pitcher. Stir well, add ice, and garnish with a mint sprig."
},
{
    name: "Virgin Piña Colada",
    image_url: "https://thefoodcharlatan.com/wp-content/uploads/2021/04/Virgin-Pina-Coladas-15.jpg",
    glass_type: "Hurricane glass",
    alcoholic: "No",
    ingredients: [
        {item: "Pineapple juice", "quantity": "3 oz"},
        {item: "Coconut cream", "quantity": "2 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Pineapple wedge", "quantity": "For garnish"},
        {item: "Cherry", "quantity": "For garnish"}
    ],
    instructions: "Combine pineapple juice, coconut cream, and ice in a blender. Blend until smooth and pour into a chilled hurricane glass. Garnish with a pineapple wedge and cherry."
},{
    name: "Strawberry Lemonade",
    image_url: "https://th.bing.com/th/id/R.36ed3da35f28a1003841f3d9a5cb9c1d?rik=lMdtXksr7iRXLQ&pid=ImgRaw&r=0",
    glass_type: "Collins glass",
    alcoholic: "No",
    ingredients: [
        {item: "Fresh strawberries", "quantity": "1 cup (pureed)"},
        {item: "Fresh lemon juice", "quantity": "2 oz"},
        {item: "Sugar", "quantity": "1 tbsp"},
        {item: "Water", "quantity": "4 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Lemon wheel", "quantity": "For garnish"}
    ],
    instructions: "Combine strawberry puree, lemon juice, sugar, and water in a pitcher or glass. Stir well, add ice, and garnish with a lemon wheel."
},{
    name: "Cucumber Cooler",
    image_url: "https://www.deliciousmagazine.co.uk/wp-content/uploads/2018/07/809461-1-eng-GB_gin-mare-cucumber-cooler-768x960.jpg",
    glass_type: "Highball glass",
    alcoholic: "No",
    ingredients: [
        {item: "Cucumber slices", "quantity": "5 slices"},
        {item: "Fresh lime juice", "quantity": "1 oz"},
        {item: "Mint leaves", "quantity": "5 leaves"},
        {item: "Soda water", "quantity": "Top up"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Cucumber ribbon", "quantity": "For garnish"}
    ],
    instructions: "Muddle cucumber slices and mint leaves in a glass. Add lime juice, fill the glass with ice, and top with soda water. Stir gently and garnish with a cucumber ribbon."
},{
    name: "Virgin Sangria",
    image_url: "https://th.bing.com/th/id/R.f461264d060d6e30212f299cdf4012dd?rik=otnPZ4x1XEHJKg&pid=ImgRaw&r=0",
    glass_type: "Pitcher or wine glass",
    alcoholic: "No",
    ingredients: [
        {item: "Grape juice", "quantity": "3 oz"},
        {item: "Orange juice", "quantity": "2 oz"},
        {item: "Lemon-lime soda", "quantity": "2 oz"},
        {item: "Mixed fruit (orange slices, apple cubes, berries)", "quantity": "1 cup"},
        {item: "Ice", "quantity": "As needed"}
    ],
    instructions: "Combine grape juice, orange juice, and lemon-lime soda in a pitcher. Add mixed fruit and ice. Stir well and serve in wine glasses."
},{
    name: "Sparkling Berry Punch",
    image_url: "https://th.bing.com/th/id/OIP.2HJOFo3rRD4k34SlSYhgcgHaJH?w=177&h=218&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    glass_type: "Punch bowl or highball glass",
    alcoholic: "No",
    ingredients: [
        {item: "Mixed berries (strawberries, blueberries, raspberries)", "quantity": "1 cup"},
        {item: "Cranberry juice", "quantity": "2 oz"},
        {item: "Lemon-lime soda", "quantity": "4 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Mint sprig", "quantity": "For garnish"}
    ],
    instructions: "Combine mixed berries and cranberry juice in a punch bowl or glass. Add lemon-lime soda and ice. Stir gently and garnish with a mint sprig."
},{
    name: "Tropical Sunrise",
    image_url: "https://www.roseclearfield.com/wp-content/uploads/2022/08/Tequila-Sunrise-Mocktail-Drink-Recipe-Whisk-It-Real-Gud.jpg",
    glass_type: "Highball glass",
    alcoholic: "No",
    ingredients: [
        {item: "Orange juice", "quantity": "3 oz"},
        {item: "Pineapple juice", "quantity": "2 oz"},
        {item: "Grenadine syrup", "quantity": "0.5 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Orange slice", "quantity": "For garnish"},
        {item: "Cherry", "quantity": "For garnish"}
    ],
    instructions: "Fill a glass with ice. Pour orange juice and pineapple juice into the glass, stir to mix. Slowly pour grenadine down the side of the glass; it will settle at the bottom and create a sunrise effect. Garnish with an orange slice and a cherry."
},{
    name: "Minty Watermelon Cooler",
    image_url: "https://www.coolinarco.com/wp-content/uploads/2023/09/ds0887_Watermelon_Mint_Cooler_59df4cc9-554f-4190-888d-734535495916.jpg",
    glass_type: "Collins glass",
    alcoholic: "No",
    ingredients: [
        {item: "Watermelon chunks", "quantity": "1 cup (pureed)"},
        {item: "Fresh lime juice", "quantity": "1 oz"},
        {item: "Mint leaves", "quantity": "5 leaves"},
        {item: "Soda water", "quantity": "Top up"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Mint sprig", "quantity": "For garnish"}
    ],
    instructions: "Combine watermelon puree, lime juice, and mint leaves in a glass. Stir well, add ice, and top with soda water. Garnish with a mint sprig."
},{
    name: "Virgin Cucumber Gimlet",
    image_url: "https://th.bing.com/th/id/OIP.bXBKCa87miJfx4kOyHEAIgHaHa?rs=1&pid=ImgDetMain",
    glass_type: "Cocktail glass",
    alcoholic: "No",
    ingredients: [
        {item: "Cucumber slices", "quantity": "5 slices"},
        {item: "Fresh lime juice", "quantity": "1 oz"},
        {item: "Simple syrup", "quantity": "0.5 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Cucumber ribbon", "quantity": "For garnish"}
    ],
    instructions: "Muddle cucumber slices in a shaker. Add lime juice, simple syrup, and ice. Shake well and strain into a chilled cocktail glass. Garnish with a cucumber ribbon."
},{
    name: "Blueberry Basil Smash",
    image_url: "https://th.bing.com/th/id/R.5d7d695f2b7d3b0c3885919d5f4891b8?rik=xhWg6YMVaduueQ&riu=http%3a%2f%2fwww.mind-over-batter.com%2fblog%2fwp-content%2fuploads%2f2014%2f09%2fBeFunky_BeFunky_Blueberry-Basil-Smash-81.jpg1.jpg&ehk=5P%2bTC2Jna8FBDs7afSF8VOeOrLxoi8mDW2BpiAfrhbI%3d&risl=&pid=ImgRaw&r=0",
    glass_type: "Rocks glass",
    alcoholic: "No",
    ingredients: [
        {item: "Fresh blueberries", "quantity": "1/4 cup"},
        {item: "Fresh basil leaves", "quantity": "5 leaves"},
        {item: "Lemon juice", "quantity": "1 oz"},
        {item: "Simple syrup", "quantity": "0.5 oz"},
        {item: "Soda water", "quantity": "Top up"},
        {item: "Ice", "quantity": "As needed"}
    ],
    instructions: "Muddle blueberries and basil leaves in a glass. Add lemon juice, simple syrup, and ice. Top with soda water, stir gently, and serve."
},{
    name: "Pineapple Ginger Fizz",
    image_url: "https://i0.wp.com/tasteandtipple.ca/wp-content/uploads/2019/02/Pi%C3%B1a-Ginger-Fizz-1039.jpg?w=800&ssl=1",
    glass_type: "Highball glass",
    alcoholic: "No",
    ingredients: [
        {item: "Pineapple juice", "quantity": "3 oz"},
        {item: "Ginger ale", "quantity": "3 oz"},
        {item: "Fresh lime juice", "quantity": "0.5 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Pineapple wedge", "quantity": "For garnish"}
    ],
    instructions: "Combine pineapple juice and lime juice in a glass with ice. Top with ginger ale, stir gently, and garnish with a pineapple wedge."
},{
    name: "Raspberry Mint Lemonade",
    image_url: "https://i2.wp.com/www.tastesoflizzyt.com/wp-content/uploads/2017/03/Sparkling-Raspberry-Mint-Lemonade-2.jpg?resize=640%2C853&ssl=1",
    glass_type: "Collins glass",
    alcoholic: "No",
    ingredients: [
        {item: "Fresh raspberries", "quantity": "1/4 cup"},
        {item: "Mint leaves", "quantity": "5 leaves"},
        {item: "Lemon juice", "quantity": "2 oz"},
        {item: "Sugar", "quantity": "1 tbsp"},
        {item: "Water", "quantity": "4 oz"},
        {item: "Ice", "quantity": "As needed"}
    ],
    instructions: "Muddle raspberries and mint leaves in a glass. Add lemon juice, sugar, and water. Stir well, add ice, and serve."
},{
    name: "Coconut Lime Refresher",
    image_url: "https://www.designeatrepeat.com/wp-content/uploads/Frozen-Vanilla-Coconut-Lime-Refresher2.jpg",
    glass_type: "Hurricane glass",
    alcoholic: "No",
    ingredients: [
        {item: "Coconut water", "quantity": "4 oz"},
        {item: "Fresh lime juice", "quantity": "1 oz"},
        {item: "Simple syrup", "quantity": "0.5 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Lime wheel", "quantity": "For garnish"}
    ],
    instructions: "Combine coconut water, lime juice, and simple syrup in a glass with ice. Stir well and garnish with a lime wheel."
},{
    name: "Peach Basil Spritzer",
    image_url: "https://i.pinimg.com/originals/92/fd/8b/92fd8b23286684dbaf7a2acc032ec976.jpg",
    glass_type: "Wine glass",
    alcoholic: "No",
    ingredients: [
        {item: "Peach puree", "quantity": "2 oz"},
        {item: "Fresh basil leaves", "quantity": "3 leaves"},
        {item: "Soda water", "quantity": "4 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Peach slice", "quantity": "For garnish"}
    ],
    instructions: "Combine peach puree and basil leaves in a glass. Add soda water and ice. Stir gently and garnish with a peach slice."
},{
    name: "Mojito",
    image_url:"https://cache.marieclaire.fr/data/photo/w1414_ci/69/recette-virgin-mojito.jpg",
    glass_type: "Collins glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "White rum", "quantity": "2 oz"},
        {item: "Mint leaves", "quantity": "10 leaves"},
        {item: "Sugar", "quantity": "1 tsp"},
        {item: "Lime juice", "quantity": "1 oz"},
        {item: "Soda water", "quantity": "Top up"}
    ],
    instructions: "Muddle mint leaves and sugar, add lime juice and rum, fill with ice, and top with soda water."
},{
    name: "Margarita",
    image_url: "https://www.nutritiouseats.com/wp-content/uploads/2015/01/Margaritas-2.jpg",
    glass_type: "Cocktail glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Tequila", "quantity": "2 oz"},
        {item: "Lime juice", "quantity": "1 oz"},
        {item: "Triple sec", "quantity": "1 oz"},
        {item: "Salt", "quantity": "For rim of glass"}
    ],
    instructions: "Run lime around the rim of a glass and dip in salt. Combine tequila, lime juice, and triple sec with ice in a shaker. Shake well and strain into the prepared glass."
},{
    name: "Green Tea Martini",
    image_url:"https://loveswah.com/wp-content/uploads/chinese-new-year-green-tea-mint-martini4-700x1000.jpg",
    glass_type: "Martini glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Green tea", "quantity": "1 oz (strongly brewed)"},
        {item: "Vodka", "quantity": "2 oz"},
        {item: "Honey", "quantity": "1 tsp (or simple syrup)"},
        {item: "Fresh lime juice", "quantity": "0.5 oz"},
        {item: "Ice", "quantity": "As needed"}
    ],
    instructions: "Brew strong green tea and let it cool. Combine green tea, vodka, honey (or simple syrup), and lime juice in a shaker with ice. Shake well, strain into a chilled martini glass, and garnish with a lime wheel or mint."
},
{
    name: "Old Fashioned",
    image_url: "https://www.tastingtable.com/img/gallery/9-old-fashioned-variations-you-need-to-try/intro-1666195038.jpg",
    glass_type: "Rocks glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Bourbon", "quantity": "2 oz"},
        {item: "Sugar cube", "quantity": "1 cube"},
        {item: "Angostura bitters", "quantity": "2-3 dashes"},
        {item: "Orange peel", "quantity": "1 strip"},
        {item: "Ice", "quantity": "As needed"}
    ],
    instructions: "Place the sugar cube in a glass and douse it with bitters. Muddle the sugar and bitters together. Add bourbon and a large ice cube, stir gently to combine. Garnish with the orange peel."
},{
    name: "Dirty Martini",
    image_url: "https://ik.imagekit.io/bhug69xts/dirty-martini.png",
    glass_type: "Martini glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Gin or vodka", "quantity": "2.5 oz"},
        {item: "Dry vermouth", "quantity": "0.5 oz"},
        {item: "Olive brine", "quantity": "0.5 oz"},
        {item: "Olives", "quantity": "For garnish"}
    ],
    instructions: "Combine gin or vodka, dry vermouth, and olive brine in a shaker with ice. Shake well and strain into a chilled martini glass. Garnish with olives."
},{
    name: "Negroni",
    image_url: "https://www.thespruceeats.com/thmb/uiC0MCgm-wncN3TvF_EFM0bWKCk=/6000x4000/filters:fill(auto,1)/negroni-cocktail-recipe-759327-6-5b3f965b46e0fb00364f8d61.jpg",
    glass_type: "Rocks glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Gin", "quantity": "1 oz"},
        {item: "Campari", "quantity": "1 oz"},
        {item: "Sweet vermouth", "quantity": "1 oz"},
        {item: "Orange peel", "quantity": "For garnish"}
    ],
    instructions: "Combine gin, Campari, and sweet vermouth in a mixing glass with ice. Stir until well chilled. Strain into a chilled glass over a large ice cube and garnish with an orange peel."
},{
    name: "Manhattan",
    image_url: "https://img.freepik.com/premium-photo/manhattan-cocktail_1006041-315.jpg",
    glass_type: "Coupe glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Rye whiskey", "quantity": "2 oz"},
        {item: "Sweet vermouth", "quantity": "1 oz"},
        {item: "Angostura bitters", "quantity": "2 dashes"},
        {item: "Maraschino cherry", "quantity": "For garnish"}
    ],
    instructions: "Combine rye whiskey, sweet vermouth, and Angostura bitters in a mixing glass with ice. Stir until well chilled. Strain into a chilled coupe or martini glass and garnish with a maraschino cherry."
},{
    name: "Gin and Tonic",
    image_url: "https://www.thedrinkkings.com/wp-content/uploads/2017/04/Gin-Tonic-25-630-630x668.jpg",
    glass_type: "Highball glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Gin", "quantity": "2 oz"},
        {item: "Tonic water", "quantity": "4 oz"},
        {item: "Lime wedge", "quantity": "1 (for garnish)"},
        {item: "Ice", "quantity": "As needed"}
    ],
    instructions: "Fill a highball glass with ice. Add gin and top with tonic water. Gently stir and garnish with a lime wedge."
},{
    name: "Tequila Slammer",
    image_url: "https://mixologyhq.com/wp-content/uploads/2023/02/Tequila-Slammer-600x600.png",
    glass_type: "Shot glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Tequila", "quantity": "1.5 oz"},
        {item: "Soda water or lemonade", "quantity": "1.5 oz"}
    ],
    instructions: "Pour tequila and soda water (or lemonade) into a sturdy glass. Cover the glass with your hand and slam it gently on a hard surface to mix and create fizz. Drink immediately while it's still bubbly."
},{
    name: "Tequila Sunrise",
    image_url: "https://th.bing.com/th/id/OIP.SN95QcPw2fIdGdmX05JtEQAAAA?rs=1&pid=ImgDetMain",
    glass_type: "Highball glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Tequila", "quantity": "2 oz"},
        {item: "Orange juice", "quantity": "4 oz"},
        {item: "Grenadine syrup", "quantity": "0.5 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Orange slice", "quantity": "For garnish"},
        {item: "Cherry", "quantity": "For garnish"}
    ],
    instructions: "Fill a glass with ice. Pour tequila and orange juice into the glass, stir to mix. Slowly pour grenadine down the side of the glass; it will settle at the bottom and create a sunrise effect. Garnish with an orange slice and a cherry."
},
{
    name: "Whiskey Sour",
    image_url: "https://www.jocooks.com/wp-content/uploads/2020/03/whiskey-sour-1.jpg",
    glass_type: "Old-Fashioned glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Bourbon or rye whiskey", "quantity": "2 oz"},
        {item: "Fresh lemon juice", "quantity": "1 oz"},
        {item: "Simple syrup", "quantity": "0.5 oz"},
        {item: "Egg white", "quantity": "Optional, 1"},
        {item: "Angostura bitters", "quantity": "1 dash"},
        {item: "Ice", "quantity": "As needed"}
    ],
    instructions: "Combine whiskey, lemon juice, simple syrup, and egg white in a shaker without ice. Shake well to create foam. Add ice and shake again until chilled. Strain into a glass and garnish with Angostura bitters and a lemon twist."
},{
    name: "Amaretto Sour",
    image_url: "https://th.bing.com/th/id/OIP._XU0uMnEMXUiOQ0CL7_tAQAAAA?rs=1&pid=ImgDetMain",
    glass_type: "Rocks glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Amaretto", "quantity": "2 oz"},
        {item: "Fresh lemon juice", "quantity": "1 oz"},
        {item: "Simple syrup", "quantity": "0.5 oz"},
        {item: "Egg white", "quantity": "Optional, 1"},
        {item: "Orange slice", "quantity": "For garnish"},
        {item: "Maraschino cherry", "quantity": "For garnish"}
    ],
    instructions: "Combine amaretto, lemon juice, simple syrup, and egg white (if using) in a shaker without ice. Shake vigorously to create foam. Add ice and shake again until chilled. Strain into a glass over ice and garnish with an orange slice and a maraschino cherry."
},{
    name: "Aviation",
    image_url: "https://www.letseatcake.com/wp-content/uploads/2019/07/Aviation-Cocktail-1-618x926.jpg",
    glass_type: "Coupe glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Gin", "quantity": "2 oz"},
        {item: "Maraschino liqueur", "quantity": "0.5 oz"},
        {item: "Fresh lemon juice", "quantity": "0.75 oz"},
        {item: "Creme de Violette", "quantity": "0.25 oz"},
        {item: "Cherry", "quantity": "For garnish"}
    ],
    instructions: "Combine gin, maraschino liqueur, lemon juice, and creme de violette in a shaker with ice. Shake well and strain into a chilled coupe glass. Garnish with a cherry."
},{
    name: "Bloody Mary",
    image_url: "https://th.bing.com/th/id/R.c4b2ec6f82511220026f9db862ca04fd?rik=rsK5GSxd4FB1jQ&riu=http%3a%2f%2fwww.zobelfamilyfarms.com%2fcdn%2fshop%2farticles%2fBloody_Mary_2.jpg%3fv%3d1672351941&ehk=V8X3eq6MkRWoNDtq0TIMAG0uC8lDm8JyGPaLvCpnlJE%3d&risl=&pid=ImgRaw&r=0",
    glass_type: "Highball glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Vodka", "quantity": "2 oz"},
        {item: "Tomato juice", "quantity": "4 oz"},
        {item: "Fresh lemon juice", "quantity": "0.5 oz"},
        {item: "Hot sauce", "quantity": "2-3 dashes"},
        {item: "Worcestershire sauce", "quantity": "2-3 dashes"},
        {item: "Salt and pepper", "quantity": "To taste"},
        {item: "Celery stick", "quantity": "For garnish"},
        {item: "Ice", "quantity": "As needed"}
    ],
    instructions: "Fill a glass with ice. Add vodka, tomato juice, lemon juice, hot sauce, Worcestershire sauce, salt, and pepper. Stir well to combine. Garnish with a celery stick."
},{
    name: "Chicago Cocktail",
    image_url: "https://i.pinimg.com/originals/5d/ea/5f/5dea5fd7590ff724ee24171959d8587c.jpg",
    glass_type: "Coupe glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Brandy", "quantity": "2 oz"},
        {item: "Triple Sec", "quantity": "0.25 oz"},
        {item: "Aromatic Bitters", "quantity": "1 dash"},
        {item: "Champagne", "quantity": "1 oz"},
        {item: "Lemon peel", "quantity": "For garnish"}
    ],
    instructions: "Combine brandy, triple sec, and aromatic bitters with ice in a shaker. Shake well and strain into a coupe glass. Top with champagne and garnish with a lemon peel."
},{
    name: "Clover Club",
    image_url: "https://stevethebartender.com.au/wp-content/uploads/2016/05/clover-club-cocktail-fb.jpg",
    glass_type: "Coupe glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Gin", "quantity": "2 oz"},
        {item: "Fresh lemon juice", "quantity": "0.5 oz"},
        {item: "Raspberry syrup", "quantity": "0.5 oz"},
        {item: "Egg white", "quantity": "1"}
    ],
    instructions: "Combine gin, lemon juice, raspberry syrup, and egg white in a shaker without ice. Shake vigorously to emulsify. Add ice and shake again until chilled. Strain into a chilled coupe glass and garnish with fresh raspberries."
},{
    name: "Daiquiri",
    image_url: "https://th.bing.com/th/id/OIP.5Bw4-XXwKFg3FqmJsPa4xwHaLG?rs=1&pid=ImgDetMain",
    glass_type: "Cocktail glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "White rum", "quantity": "2 oz"},
        {item: "Fresh lime juice", "quantity": "1 oz"},
        {item: "Simple syrup", "quantity": "0.5 oz"},
        {item: "Ice", "quantity": "As needed"}
    ],
    instructions: "Combine white rum, lime juice, and simple syrup in a shaker with ice. Shake well and strain into a chilled cocktail glass. Garnish with a lime wheel if desired."
},{
    name: "Dark and Stormy",
    image_url: "https://th.bing.com/th/id/OIP.hWhmjYhfzVyQ6aVdDdAndAHaLH?rs=1&pid=ImgDetMain",
    glass_type: "Highball glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Dark rum", "quantity": "2 oz"},
        {item: "Ginger beer", "quantity": "4 oz"},
        {item: "Fresh lime juice", "quantity": "0.5 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Lime wedge", "quantity": "For garnish"}
    ],
    instructions: "Fill a glass with ice. Add ginger beer and lime juice, stir to combine. Carefully pour the dark rum on top to create a layered effect. Garnish with a lime wedge and serve."
},{
    name: "French 75",
    image_url: "https://images.cocktailwave.com/french-75.png",
    glass_type: "Champagne flute",
    alcoholic: "Yes",
    ingredients: [
        {item: "Gin", "quantity": "2 oz"},
        {item: "Fresh lemon juice", "quantity": "0.5 oz"},
        {item: "Simple syrup", "quantity": "0.5 oz"},
        {item: "Champagne", "quantity": "3 oz"},
        {item: "Lemon twist", "quantity": "For garnish"}
    ],
    instructions: "Combine gin, lemon juice, and simple syrup in a shaker with ice. Shake well and strain into a chilled Champagne flute. Top with Champagne and garnish with a lemon twist."
},{
    name: "Gimlet",
    image_url: "https://th.bing.com/th/id/OIP.uzur1yoyIrw4Mt6pQiLRHAAAAA?rs=1&pid=ImgDetMain",
    glass_type: "Cocktail glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Gin", "quantity": "2 oz"},
        {item: "Fresh lime juice", "quantity": "1 oz"},
        {item: "Simple syrup", "quantity": "0.5 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Lime wheel", "quantity": "For garnish"}
    ],
    instructions: "Combine gin, lime juice, and simple syrup in a shaker with ice. Shake well and strain into a chilled cocktail glass. Garnish with a lime wheel."
},{
    name: "Zombie",
    image_url: "https://www.thelittleepicurean.com/wp-content/uploads/2016/08/zombie-cocktail.jpg",
    glass_type: "Tiki mug",
    alcoholic: "Yes",
    ingredients: [
        {item: "Jamaican rum", "quantity": "1.5 oz"},
        {item: "Puerto Rican gold rum", "quantity": "1.5 oz"},
        {item: "151-proof demerara rum", "quantity": "1 oz"},
        {item: "Lime juice", "quantity": "0.75 oz"},
        {item: "Don's Mix", "quantity": "0.5 oz"},
        {item: "Falernum", "quantity": "0.5 oz"},
        {item: "Grenadine", "quantity": "1 tsp"},
        {item: "Pernod", "quantity": "4 dashes"},
        {item: "Angostura bitters", "quantity": "1 dash"},
        {item: "Mint sprig", "quantity": "For garnish"}
    ],
    instructions: "Add all ingredients into a blender with 6 oz of crushed ice. Blend at high speed for no more than 5 seconds. Pour into a tall glass or Tiki mug and garnish with a mint sprig."
},{
    name: "Apple Pie Shot",
    image_url: "https://www.thefoodblog.net/wp-content/uploads/2021/09/Apple-Pie-Shots-2-2.jpg",
    glass_type: "Shot glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Apple cider", "quantity": "1.5 oz"},
        {item: "Fireball whiskey", "quantity": "0.5 oz"},
        {item: "Whipped cream", "quantity": "Optional, for garnish"},
        {item: "Cinnamon stick", "quantity": "Optional, for garnish"}
    ],
    instructions: "Pour apple cider into a shot glass. Add Fireball whiskey. Top with whipped cream and garnish with a cinnamon stick. Serve and enjoy!"
},{
    name: "Apple Pie Shot",
    image_url: "https://www.thefoodblog.net/wp-content/uploads/2021/09/Apple-Pie-Shots-2-2.jpg",
    glass_type: "Shot glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Apple cider", "quantity": "1.5 oz"},
        {item: "Fireball whiskey", "quantity": "0.5 oz"},
        {item: "Whipped cream", "quantity": "Optional, for garnish"},
        {item: "Cinnamon stick", "quantity": "Optional, for garnish"}
    ],
    instructions: "Pour apple cider into a shot glass. Add Fireball whiskey. Top with whipped cream and garnish with a cinnamon stick. Serve and enjoy!"
},{
    name: "Black Magic",
    image_url: "https://assets3.thrillist.com/v1/image/1811908/1200x600/scale;",
    glass_type: "Cocktail glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Black vodka", "quantity": "1.5 oz"},
        {item: "Lime juice", "quantity": "0.5 oz"},
        {item: "Simple syrup", "quantity": "0.5 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Lime wheel", "quantity": "For garnish"}
    ],
    instructions: "Combine black vodka, lime juice, and simple syrup in a shaker with ice. Shake well and strain into a chilled glass. Garnish with a lime wheel."
},{
    name: "Black Rose",
    image_url: "https://heybairtender.s3.amazonaws.com/recipes/black-rose-cocktail4551.png",
    glass_type: "Cocktail glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Bourbon whiskey", "quantity": "1 oz"},
        {item: "Cognac", "quantity": "1 oz"},
        {item: "Grenadine syrup", "quantity": "0.25 oz"},
        {item: "Creole bitters", "quantity": "3 dashes"},
        {item: "Aromatic bitters", "quantity": "1 dash"}
    ],
    instructions: "Combine bourbon, cognac, grenadine syrup, Creole bitters, and aromatic bitters in a mixing glass with ice. Stir well and strain into a chilled glass. Serve neat and garnish with a lemon zest twist."
},{
    name: "Blood and Sand",
    image_url: "https://th.bing.com/th/id/OIP.mBUd9XD5JFn7xknvLurKGAHaHa?rs=1&pid=ImgDetMain",
    glass_type: "Coupe glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Scotch whisky", "quantity": "0.75 oz"},
        {item: "Sweet vermouth", "quantity": "0.75 oz"},
        {item: "Cherry brandy", "quantity": "0.75 oz"},
        {item: "Orange juice", "quantity": "0.75 oz"},
        {item: "Orange peel", "quantity": "For garnish"}
    ],
    instructions: "Combine scotch whisky, sweet vermouth, cherry brandy, and orange juice in a shaker with ice. Shake well and strain into a chilled coupe glass. Garnish with an orange peel."
},{
    name: "Pina Colada",
    image_url: "https://th.bing.com/th/id/R.2a4cd5979c1a99a05de9698e4f2cff87?rik=UTe04PzOxbWKDA&pid=ImgRaw&r=0",
    glass_type: "Hurricane glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "White rum", "quantity": "1.5 oz"},
        {item: "Coconut cream", "quantity": "2 oz"},
        {item: "Pineapple juice", "quantity": "3 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Pineapple wedge", "quantity": "For garnish"},
        {item: "Cherry", "quantity": "For garnish"}
    ],
    instructions: "Combine rum, coconut cream, pineapple juice, and ice in a blender. Blend until smooth and pour into a chilled hurricane glass. Garnish with a pineapple wedge and cherry."
},{
    name: "Tom Collins",
    image_url: "https://craftybartending.com/wp-content/uploads/2018/04/Tom-Collins-Cocktail.jpg",
    glass_type: "Collins glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Gin", "quantity": "2 oz"},
        {item: "Fresh lemon juice", "quantity": "1 oz"},
        {item: "Simple syrup", "quantity": "0.5 oz"},
        {item: "Club soda", "quantity": "Top up"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Lemon wedge", "quantity": "For garnish"}
    ],
    instructions: "Combine gin, lemon juice, and simple syrup in a shaker with ice. Shake well and strain into a Collins glass filled with ice. Top with club soda and garnish with a lemon wedge."
},{
    name: "Mai Tai",
    image_url: "https://th.bing.com/th/id/OIP.EMkZKFb7XbXAvUd-H0o9bQAAAA?rs=1&pid=ImgDetMain",
    glass_type: "Rocks glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Light rum", "quantity": "1 oz"},
        {item: "Dark rum", "quantity": "1 oz"},
        {item: "Orange curacao", "quantity": "0.5 oz"},
        {item: "Orgeat syrup", "quantity": "0.5 oz"},
        {item: "Fresh lime juice", "quantity": "1 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Mint sprig", "quantity": "For garnish"}
    ],
    instructions: "Combine light rum, orange curacao, orgeat syrup, and lime juice in a shaker with ice. Shake well and pour into a rocks glass filled with ice. Float dark rum on top and garnish with a mint sprig."
},{
    name: "Espresso Martini",
    image_url: "https://th.bing.com/th/id/OIP.4AqzHl1BaDKHk7qg01mtnwHaL2?rs=1&pid=ImgDetMain",
    glass_type: "Martini glass",
    alcoholic: "Yes",
    ingredients: [
        {item: "Vodka", "quantity": "2 oz"},
        {item: "Coffee liqueur", "quantity": "1 oz"},
        {item: "Freshly brewed espresso (cooled)", "quantity": "1 oz"},
        {item: "Simple syrup (optional)", "quantity": "0.5 oz"},
        {item: "Ice", "quantity": "As needed"},
        {item: "Coffee beans", "quantity": "For garnish"}
    ],
    instructions: "Add vodka, coffee liqueur, espresso, and simple syrup (if using) to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled martini glass and garnish with three coffee beans."
}
];

const App = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {cocktails.map((cocktail, index) => (
        <Cocktail key={index} cocktail={cocktail} />
      ))}
    </div>
  );
};

export default App;
