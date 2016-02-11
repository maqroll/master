package test;

import java.io.File;

import org.junit.After;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestRule;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

/**
 * Unit test for simple App.
 */
public class AppTest
{
	private static final String CHROME_BINARY = "D:\\bin\\PortableApps\\GoogleChromePortable\\GoogleChromePortable.exe";

	private static final String FIREFOX_BINARY = "D:\\bin\\PortableApps\\FirefoxPortable\\App\\Firefox\\firefox.exe";

	private WebDriver driver = null;

	public WebDriver getDriver() {
		return driver;
	}

	@Rule
	public TestRule errorCapture = new ScreenshotTestRule(this);

	@After
	public void tearDown() throws Exception {
		// Se ejecuta antes que Rule. No podemos utilizarla para cerrar el
		// navegador.
	}

	/**
	 * Firefox
	 */
	@Test
	public void testOnFirefox()
	{
		FirefoxProfile profile = new FirefoxProfile();

		FirefoxBinary binary = new FirefoxBinary(new File(
				FIREFOX_BINARY));
		driver = new FirefoxDriver(binary, profile);
		// driver.manage().deleteAllCookies();
		navigation();
	}

	/**
	 * IE. OJO!! esta aplicación no funciona en IE.
	 */
	@Test
	public void testOnIE() {
		DesiredCapabilities caps = DesiredCapabilities.internetExplorer();
		caps.setCapability("ignoreZoomSetting", true);
		caps.setCapability("ignoreProtectedModeSettings", true);
		caps.setCapability("ensureCleanSession", true);

		driver = new InternetExplorerDriver(caps);
		// driver.manage().deleteAllCookies();
		navigation();
	}

	/**
	 * Chrome
	 */
	@Test
	public void testOnChrome() {
		ChromeOptions options = new ChromeOptions();
		options.setBinary(CHROME_BINARY);
		driver = new ChromeDriver(options);
		// driver.manage().deleteAllCookies();
		navigation();
	}

	private void navigation() {
		TodoPage.navigateTo(driver).addItem().complete().deleteItem();
	}
}
