// @ts-check
import { test, expect } from "@playwright/test";

test("Convert multiple Singlish sentences", async ({ page }) => {
  const testCases = [
    {
      input: "aeyi oyaa heta kaempas enne naeththee ?",
      expected: "ඇයි ඔයා හෙට කැම්පස් නැත්තේ ?",
    },
    {
      input:
        "nipaa vairasaya piLibadhava karuNu paehaedhili karamin maaDhY niveedhanayak nikuth karamin ohu mee bava sadhahan kara aetha ",
      expected:
        "නිපා වෛරසය පිළිබදව කරුණු පැහැදිලි කරමින් මාධ්‍ය නිවේදනයක් නිකුත් කරමින් ඔහු මේ බව සදහන් කර ඇත ",
    },
    {
      input: "api heta meeting ekak aragena mee vaedee ivarayak karalaa dhaamu",
      expected: "අපි හෙට meeting එකක් අරගෙන මේ වැඩේ ඉවරයක් කරලා දාමු",
    },
    {
      input:
        "AMD RYZEN 9000 siriyas eka lookema geemin valata hodhama prosesar eka",
      expected: "AMD RYZEN 9000 සිරියස් එක ලෝකෙම ගේමින් වලට හොදම ප්‍රොසෙසර් එක",
    },
    {
      input: "oyaagee aasama siQQdhuva mokakdha ?",
      expected: "ඔයාගේ ආසම සිංදුව මොකක්ද ?",
    },
    {
      input: "mama nan kavadhaavath ee vagee vaedak kaatath karannee nae",
      expected: "මම නන් කවදාවත් ඒ වගේ වැඩක් කාටත් කරන්නේ නැ",
    },
    {
      input: "apihetalokuammalaagedharayanavaa",
      expected: "අපිහෙටලොකුඅම්මලාගෙදරයනවා",
    },
    {
      input: "weerasinha ta adha vaedata enna vennee nae",
      expected: "වීරසිංහ ට අද වැඩට එන්න වෙන්නේ නැ",
    },
    {
      input: "karuNaakara mata eeka paehaedhili karanna",
      expected: "කරුණාකර මට ඒක පැහැදිලි කරන්න",
    },
    {
      input: "mona magulakdha ban unbata velaa thiyennee",
      expected: "මොන මගුලක්ද බන් උන්බට වෙලා තියෙන්නේ",
    },
    {
      input: "mee kaeema paarsalaya apee naendhata gihin dhenna puluvandha?",
      expected: "මේ කෑම පාර්සලය අපේ නැන්දට ගිහින් දෙන්න පුලුවන්ද?",
    },
    {
      input: "heta DSA 8am lecture ekata mata enna venne nae ",
      expected: "හෙට DSA 8am lecture එකට මට එන්න වෙන්නෙ නැ ",
    },
    {
      input: "karuNaakara viniithava hAsirenna paasal lamun sitina sThaanayaki",
      expected: "කරුණාකර විනීතව හසිරෙන්න පාසල් ලමුන් සිටින ස්ථානයකි",
    },
    {
      input: "vaessa vahinavaa nisaa api gedhara inne",
      expected: "වැස්ස වහිනවා නිසා අපි ගෙදර ඉන්නේ",
    },
    {
      input: "PIN eka naethi karaganna epaa",
      expected: "PIN එක නැති කරගන්න එපා ",
    },
    {
      input: "giniavisadhahaabalapathrahiminovee",
      expected: "ගිනිඅවිසදහාබලපත්‍රහිමිනොවේ",
    },
    { input: "api heta palli yamu", expected: "අපි හෙට පල්ලි යමු" },
    {
      input: "mehe varen machan mona bambuvak dha karannee",
      expected: "මෙහෙ වරෙන් මචන් මොන බම්බුවක් ද කරන්නේ",
    },
    {
      input: "mata oyaagee social media accounts tika check karanna oonee",
      expected: "මට ඔයාගේ social media accounts ටික check කරන්න ඕනේ",
    },
    {
      input: "heta vaedapolee kattiyath ekka trip ekak yanavaa",
      expected: "හෙට වැඩපොලේ කට්ටියත් එක්ක trip එකක් යනවා",
    },
    {
      input: "weerasinha ta adha vaedata enna vennee nae",
      expected: "වීරසිංහ ට අද වැඩට එන්න වෙන්නේ නැ",
    },
    {
      input:
        "heta aaNduvee bus strike ekak thiyana nisaa mama office enne nae ee nisaa api meeting eka zoom eken thiyamu. naeththan haemootama loku prashnayak veyi. karana dheyak ikmanata karamu. mama meeting eka thiyana velaava kiyannam oyaalata mokadha eeka godak pahasu veyi kiyalaa mama hithanavaa. ehenan siyaluma dhenaa heta meeting ekedhii hambuvemu",
      expected:
        "හෙට ආණ්ඩුවේ bus strike එකක් තියන නිසා මම office එන්නෙ නැ ඒ නිසා අපි meeting එක zoom එකෙන් තියමු. නැත්තන් හැමෝටම ලොකු ප්‍රශ්නයක් වෙයි. කරන දෙයක් ඉක්මනට කරමු. මම meeting එක තියන වෙලාව කියන්නම් ඔයාලට මොකද ඒක ගොඩක් පහසු වෙයි කියලා මම හිතනවා. එහෙනන් සියලුම දෙනා හෙට meeting එකෙදී හම්බුවෙමු",
    },
    {
      input: "aeya maa samaga tharaga karanavaa",
      expected: "ඇය මා සමග තරග කරනවා",
    },
    {
      input: "oba esee haesirennee nam maath eseema haesirenneeya",
      expected: "ඔබ එසේ හැසිරෙන්නේ නම් මාත් එසේම හැසිරෙන්නේය",
    },
    {
      input: "netzero ilakka sapuraaliimata ensure vYaapRUthiya aeraBeyi",
      expected: "netzero ඉලක්ක සපුරාලීමට ensure ව්‍යාපෘතිය ඇරඹෙයි",
    },
    {
      input:
        "A5 maargayee prathisaQQskaraNa katayuthu avasan kiriimata chec katayuthu karayi",
      expected: "A5 මාර්ගයේ ප්‍රතිසංස්කරණ කටයුතු අවසන් කිරීමට chec කටයුතු කරයි",
    },
    {
      input: "paasalLamunsitinasThaanayaki",
      expected: "පාසල් ළමුන් සිටින ස්ථානයකි",
    },
    { input: "netzeroilakka", expected: "net zero ඉලක්ක" },
    {
      input: "kangaroo taxiyen api yamudha",
      expected: "kangaroo ටැක්සියෙන් අපි යමුද",
    },
    {
      input: "matamachanwhatsappviberdhennapuluvandha",
      expected: "මට මචන් whatsapp viber දෙන්න පුලුවන්ද",
    },
    {
      input: "ohugee nama w.a.h perera",
      expected: "ඔහුගේ නම w.a.h පෙරේරා",
    },
    {
      input: "matahetaCICHekatayannavenavaa",
      expected: "මට හෙට CICH එකට යන්න වෙනවා",
    },
    {
      input: "modayakekvennaaepa",
      expected: "මෝඩ යකෙක් වෙන්න එපා",
    },
    {
      input: "balupaetiyavaaragenawetgavatayamudha",
      expected: "බලු පැටියව අරගෙන wet ගාවට යමුද",
    },
    {
      input: "ehenan heta ara vaedee ivarayak karalaa dhamu",
      expected: "එහෙනන් හෙට අර වැඩේ ඉවරයක් කරලා දමු",
    },
  ];

  for (const tc of testCases) {
    await page.goto("https://www.swifttranslator.com/");
    const input = page.locator("textarea");
    await input.waitFor({ state: "visible" });
    await input.fill(tc.input);
    const output = page
      .locator("div.whitespace-pre-wrap")
      .filter({ hasText: tc.expected });

    await expect(output).toBeVisible({ timeout: 10000 });
    const outputText = await output.textContent();
    expect(outputText).toContain(tc.expected);
  }
});
