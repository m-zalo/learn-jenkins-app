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

    stage('stage'){
        steps {
            sh '''
                npm install netlify-cli node-jq -g
                netlify --version
                netlify status
                echo "Deploy to Staging"
                netlify deploy --dir=build --json > deploy-output.json
                node-jq -r '.deploy_url' deploy-output.json
            '''
        }
    }

    stage('approval') {
        steps {
            timeout(time: 10, unit: 'MINUTES') {
                input message: 'Deploy to Production?', ok: 'Deploy'
            }
        }
    }

    stage('deploy'){
        steps {
            sh '''
                npm install netlify-cli -g
                netlify --version
                netlify status
                echo " Deploy to Production"
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