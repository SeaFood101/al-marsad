import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Dev-only plugin: saves prop positions back to roomData.js
function propSaverPlugin() {
  return {
    name: 'prop-saver',
    configureServer(server) {
      server.middlewares.use('/__save-prop', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => {
          try {
            const { propId, top, left, width } = JSON.parse(body);
            const filePath = path.resolve(__dirname, 'src/data/roomData.js');
            let content = fs.readFileSync(filePath, 'utf-8');

            // Find the prop by id and update top, left, width values
            const propRegex = new RegExp(
              `(id:\\s*'${propId}'[^}]*?top:\\s*)([\\d.]+)(,\\s*left:\\s*)([\\d.]+)(,\\s*width:\\s*)([\\d.]+)`,
              's'
            );

            if (!propRegex.test(content)) {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: `Prop "${propId}" not found in roomData.js` }));
              return;
            }

            content = content.replace(propRegex, `$1${top}$3${left}$5${width}`);
            fs.writeFileSync(filePath, content, 'utf-8');

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, propId, top, left, width }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), propSaverPlugin()],
  server: {
    host: true, // Allows network access for mobile testing
  },
})
