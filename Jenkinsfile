pipeline {
  agent any

  tools {
    nodejs "Node 20" // اسم النسخة لي ضايف فـ Jenkins Tools
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm install'
        sh 'npx playwright install'
      }
    }

    stage('Run tests') {
      steps {
        sh 'npx playwright test'
      }
    }

    stage('Generate Allure Report') {
      steps {
        sh 'npx allure generate ./allure-results --clean -o ./allure-report'
      }
    }

    stage('Archive Allure Report') {
      steps {
        archiveArtifacts artifacts: 'allure-report/**', fingerprint: true
      }
    }
  }
}
