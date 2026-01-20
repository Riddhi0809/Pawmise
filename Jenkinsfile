pipeline {
    agent any

    tools {
        jdk 'jdk17'
        nodejs 'node18'
    }

    environment {
        NODE_ENV = 'test'
        MONGO_URI = 'mongodb://127.0.0.1:27017/testdb'
        RAZORPAY_KEY_ID = 'dummy'
        RAZORPAY_KEY_SECRET = 'dummy'
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

        stage('SonarCloud Analysis') {
            steps {
                withSonarQubeEnv('SonarCloud') {
                    bat "\"${tool 'sonar-scanner'}\\bin\\sonar-scanner.bat\""
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
