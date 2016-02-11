package test;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.junit.rules.TestRule;
import org.junit.runner.Description;
import org.junit.runners.model.Statement;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

public class ScreenshotTestRule implements TestRule {

	private AppTest test;

	public ScreenshotTestRule(AppTest test) {
		this.test = test;
	}

	public Statement apply(final Statement base, final Description description) {
		return new Statement() {

			@Override
			public void evaluate() throws Throwable {
				try {
					base.evaluate();
				} catch (Throwable t) {
					// exception will be thrown only when a test fails.
					captureScreenshot(description.getDisplayName());
					// rethrow to allow the failure to be reported by JUnit
					throw t;
				} finally {
					if (test.getDriver() != null) {
						test.getDriver().close();
						test.getDriver().quit();
					}
				}
			}

			public void captureScreenshot(String fileName) {
				try {
					//
					File screenshot = ((TakesScreenshot) test.getDriver())
							.getScreenshotAs(OutputType.FILE);
					// the screenshots can be moved to a folder for sorting
					FileUtils.copyFile(screenshot, new File("d:\\failedTest-"
							+ fileName + ".png"));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		};
	}
}