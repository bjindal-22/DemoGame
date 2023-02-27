Demo is published at: https://bjindal-22.github.io/DemoGame/

Reelset:
- Band 1: "hv2", "lv3", "lv3", "hv1", "hv1", "lv1", "hv1", "hv4", "lv1", "hv3", "hv2", "hv3", "lv4", "hv4", "lv1", "hv2", "lv4", "lv1", "lv3", "hv2"
- Band 2: "hv1", "lv2", "lv3", "lv2", "lv1", "lv1", "lv4", "lv1", "lv1", "hv4", "lv3", "hv2", "lv1", "lv3", "hv1", "lv1", "lv2", "lv4", "lv3", "lv2"
- Band 3: "lv1", "hv2", "lv3", "lv4", "hv3", "hv2", "lv2", "hv2", "hv2", "lv1", "hv3", "lv1", "hv1", "lv2", "hv3", "hv2", "hv4", "hv1", "lv2", "lv4"
- Band 4: "hv2", "lv2", "hv3", "lv2", "lv4", "lv4", "hv3", "lv2", "lv4", "hv1", "lv1", "hv1", "lv2", "hv3", "lv2", "lv3", "hv2", "lv1", "hv3", "lv2"
- Band 5: "lv3", "lv4", "hv2", "hv3", "hv4", "hv1", "hv3", "hv2", "hv2", "hv4", "hv4", "hv2", "lv2", "hv4", "hv1", "lv2", "hv1", "lv2", "hv4", "lv4"

## 1. Reels grid uses reel stop positions to display 3 symbols:

    Positions: 18, 9, 2, 0, 12
    Screen:
      lv3 hv4 lv3 hv2 lv2
      hv2 lv3 lv4 lv2 hv4
      hv2 hv2 hv3 hv3 hv1

## 2. winnings calculation for the following paytable:

     Symbol id | 3 of a kind | 4 of a kind | 5 of a kind 
    -----------|-------------|-------------|-------------
         hv1   |      10     |      20     |      50
    -----------|-------------|-------------|-------------
         hv2   |      5      |      10     |      20
    -----------|-------------|-------------|-------------
         hv3   |      5      |      10     |      15
    -----------|-------------|-------------|-------------
         hv4   |      5      |      10     |      15 
    -----------|-------------|-------------|-------------
         lv1   |      2      |      5      |      10 
    -----------|-------------|-------------|-------------
         lv2   |      1      |      2      |      5 
    -----------|-------------|-------------|-------------
         lv3   |      1      |      2      |      3 
    -----------|-------------|-------------|-------------
         lv4   |      1      |      2      |      3 
    -----------|-------------|-------------|-------------


Here is an example of a complete result with wins:

    Positions: 0, 11, 1, 10, 14
    Screen:
      hv2 hv2 hv2 lv1 hv1
      lv3 lv1 lv3 hv1 lv2
      lv3 lv3 lv4 lv2 hv1
    Total wins: 6 
    - hv2 x3, 5
    - lv3 x3, 1

And here's another example:

    Positions: 0, 0, 0, 0, 0
    Screen:
      hv2 hv1 lv1 hv2 lv3
      lv3 lv2 hv2 lv2 lv4
      lv3 lv3 lv3 hv3 hv2
    Total wins: 1 
    - lv3 x3, 1

When there is a win, all symbols which generate the winning combination will animate (scale up, rotate a little, scale down), then these symbols will get replaced (fade out old symbols, fade in new symbols animation) by new set of symbols (generated randomly) and then again if there is any win, the total win is displayed and also the symbols will animate. This goes on until there are no more wins, which is when the spin button gets enabled again and game is ready for next spin.

The symbols which are replaced are fade out and new symbols fade in. This animation can be of any type. In similar lines is the Popwins feature, where the symbols are replaced by two symbols instead of one new symbol.


To install dependencies:

npm i

To build the code:

npm start

To run the build:

host the build folder using any local server like http-server / wamp/ IIS etc
 using http-server:

 in dist folder use following command:
 hs // this will host the build on localhost:8080

 or

 hs -p 8084 // this will host the build on localhost:8084
 
 or open https://bjindal-22.github.io/DemoGame/


