pipeline {
    agent any
    
    environment {
        NETLIFY_SITE_ID = '146d7463-d901-4c25-82ce-1e9263d4aa45'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
    }

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
/*
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
*/

    stage('deploy'){
        steps {
            sh '''
                npm install netlify-cli -g
                netlify status
                netlify deploy --dir=build --prod
            '''
        }
    }

    }
    post {
        always {
            junit 'jest-results/junit.xml'
        }
    }
}