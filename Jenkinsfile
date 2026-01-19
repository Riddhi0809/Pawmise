pipeline {
    agent any

    tools {
        jdk 'jdk17'
        nodejs 'node18'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests (Mocha + Chai)') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }

        stage('SonarCloud Analysis') {
            steps {
                withSonarQubeEnv('SonarCloud') {
                    dir('backend') {
                        bat "\"%SONAR_SCANNER_HOME%\\bin\\sonar-scanner.bat\""
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
