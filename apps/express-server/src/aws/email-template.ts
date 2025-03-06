export const emailTemplate = {
  Template: {
    TemplateName: 'WelcomeTemplate',
    SubjectPart: 'Welcome Email',
    TextPart:
      'Hi {{personName}},\n\nWelcome to our service! We\'re happy to have you.\n\nCheers,\nThe Team',
    HtmlPart: `<html>
									<head>
										<style>
											.container {
												font-family: Arial, sans-serif;
												text-align: center;
												padding: 20px;
											}
											h1 {
												color: #333333;
											}
											img {
												max-width: 100%;
												height: auto;
											}
										</style>
									</head>
									<body>
										<div class='container'>
											<h1>Welcome, {{personName}}!</h1>
											<p>We are excited to have you with us.</p>
											<p>
                        <img
                          src='https://images.squarespace-cdn.com/content/5e949a92e17d55230cd1d44f/1643338374594-WVJKK80W6SB9BZK86I5F/HelloLight_Mac.png'
													alt='Welcome Image'
												/>
											</p>
											<p>Cheers,<br/>The Team</p>
										</div>
									</body>
								</html>`
  }
};
