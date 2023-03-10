import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Brand',
      description: 'My personal brand API ',
      version: '1.0.0',
    },
    components:{
      securitySchemes:{
        BearerAuth:{
          type: "http",
          scheme: "bearer"

        }
      }

    }
  },
  // looks for configuration in specified directories
  apis: ["./src/routers/*.js"],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default swaggerDocs
