import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { exec } from 'child_process';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'run-gulp-tasks',
      buildStart() {
        return new Promise((resolve, reject) => {
          exec('gulp', (err, stdout, stderr) => {
            if (err) {
              console.error(stderr);
              return reject(err);
            }
            console.log(stdout);
            resolve();
          });
        });
      },
    },
  ],
});
