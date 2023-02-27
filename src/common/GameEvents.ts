export class GameEvents {
    public static ASSETS_LOADED = new Event("assetsloaded");
    public static PLACE_BET = new Event("placebet");
    public static PLACE_BET_PARSED = new Event("placebetparsed");
    public static SHOW_PROGRESS = new Event("showprogress");
    public static SPIN = new Event("spin");
    public static GENERATE_NEW_SYMBOLS = new Event("generatenewsymbols");
    public static SHOW_NEW_SYMBOLS = new Event("shownewsymbols");
}
