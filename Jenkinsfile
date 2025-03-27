pipeline {
    agent any
    
    tools{
        nodejs('23.10')
    }
    
    stages {        
        stage('Build') {
            steps {
                sh '''
                    node --version
                    npm --version
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Test'){
            steps {
                sh'''
                    test -f ./build/index.html
                    npm test
                '''
            }
        }

        stage('E2E'){
            steps {
                sh'''
                    npm install -g serve
                    serve -s build &
                    sleep 10
                    npx playwright install
                    npx playwright test
                '''
            }
        }

    }
    post {
        always {
            junit 'test-results/junit.xml'
        }
    }
}