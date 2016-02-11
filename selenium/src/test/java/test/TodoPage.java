package test;

import static org.openqa.selenium.support.ui.ExpectedConditions.textToBePresentInElementLocated;

import java.util.concurrent.TimeUnit;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.google.common.base.Function;


public class TodoPage {

	private static final String TODO_URL = "http://todomvc.com/architecture-examples/backbone/";

	private static final String TODO_ITEM = "la prueba de luis";

	private static final int TIMEOUT = 10;

	private WebDriver driver;

	@FindBy(id = "new-todo")
	private WebElement newInput;

	@FindBy(css = "li div.view button.destroy")
	private WebElement deleteButton;

	@FindBy(css = "input.toggle")
	private WebElement completeCheck;

	@FindBy(css = "#todo-count strong")
	private WebElement pendingCount;

	public TodoPage(WebDriver driver) {
		this.driver = driver;
	}

	public static TodoPage navigateTo(WebDriver driver) {
		driver.get(TODO_URL);
		TodoPage result = PageFactory.initElements(driver, TodoPage.class);

		Assert.assertNotNull(result.newInput);
		return result;
	}

	/**
	 * Añade un item a la lista y comprueba que se ha añadido correctamente.
	 */
	public TodoPage addItem() {
		newInput.sendKeys(TODO_ITEM + "\n");

		WebDriverWait wait = new WebDriverWait(driver, TIMEOUT);
		wait.until(textToBePresentInElementLocated(
				By.cssSelector("li div.view label"), TODO_ITEM));

		PageFactory.initElements(driver, this);

		Assert.assertNotNull(deleteButton);
		Assert.assertNotNull(completeCheck);
		Assert.assertNotNull(pendingCount);

		return this;
	}

	public TodoPage complete() {
		Assert.assertNotNull(completeCheck);

		Assert.assertEquals(pendingCount.getText(), "1");

		completeCheck.click();

		WebDriverWait wait = new WebDriverWait(driver, TIMEOUT);
		wait.until(textToBePresentInElementLocated(
				By.cssSelector("#todo-count strong"), "0"));

		PageFactory.initElements(driver, this);

		return this;
	}

	/**
	 * Añade un item a la lista y comprueba que se ha añadido correctamente.
	 */
	public TodoPage deleteItem() {
		Assert.assertNotNull(deleteButton);

		// deleteButton no es visible -> click() dispara una excepción
		// deleteButton.click();
		((JavascriptExecutor) driver).executeScript("arguments[0].click();",
				deleteButton);

		// La construcción not(presenceOf(..)) no funciona correctamente
		FluentWait<WebDriver> wait = new FluentWait<WebDriver>(driver)
				.withTimeout(TIMEOUT, TimeUnit.SECONDS).pollingEvery(1,
						TimeUnit.SECONDS);

		wait.until(new Function<WebDriver, Boolean>() {
			public Boolean apply(WebDriver driver) {
				return driver.findElements(
						By.cssSelector("li div.view button.destroy")).size() == 0;
			}
		});

		PageFactory.initElements(driver, this);

		return this;
	}
}
