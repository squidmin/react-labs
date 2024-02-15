# Blue-green deployments with Cloud Run

Google Cloud Run inherently supports a form of blue-green deployment through its managed deployment process. When you deploy a new revision to a service in Cloud Run, traffic is automatically shifted to the new revision if the deployment is successful, with no downtime. This process inherently ensures that if the new revision fails to start or becomes unhealthy, it will not start receiving traffic, effectively maintaining the stability of your service with the previous revision.

However, to explicitly implement a blue-green deployment strategy and ensure even more control over the deployment process, you might want to consider the following enhancements and practices:

### Manual Traffic Shifting

If you want manual control over traffic shifting (which is closer to a traditional blue-green deployment model), you can deploy the new revision without immediately routing traffic to it and then manually shift the traffic once you're confident in the new revision's stability.

1. **Deploy Without Traffic Migration**:
   Add `--no-traffic` flag to the `gcloud run deploy` command to deploy the new revision without serving traffic to it immediately.

   ```sh
   gcloud run deploy react-labs \
     --image=us-central1-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/react-labs-test/react-labs:latest \
     --project=${{ secrets.GCP_PROJECT_ID }} \
     --service-account=gh-actions-pipeline@${{ secrets.GCP_PROJECT_ID }}.iam.gserviceaccount.com \
     --region=us-central1 \
     --platform=managed \
     --quiet \
     --no-traffic \
     --allow-unauthenticated \
     --verbosity=debug
   ```

2. **Manually Shift Traffic**:
   After deployment, once you have verified the new revision is stable (through automated tests, manual checks, or monitoring), you can shift traffic to the new revision using a separate command. This step could be automated in your CI/CD pipeline as a separate job that requires manual approval for enhanced control.

   ```sh
   gcloud run services update-traffic react-labs --to-latest --project=${{ secrets.GCP_PROJECT_ID }} --region=us-central1
   ```

### Rollback on Failure

Cloud Run deployments are atomic. If a new revision fails to start or does not become healthy, Cloud Run does not route traffic to it, effectively serving as an automatic rollback mechanism to the last healthy revision. You don't need to implement an explicit rollback in your workflow for deployment failures that prevent the new revision from receiving traffic.

However, if you want to implement a custom rollback mechanism (for example, after manually shifting traffic to a new revision that later shows problems), you can use the `gcloud run services update-traffic` command to shift traffic back to a specific previous revision based on its ID.

### Automating Blue-Green Deployments

While Cloud Run's default behavior provides a robust foundation for deploying updates with minimal downtime, implementing a full blue-green deployment strategy with manual traffic shifting and explicit rollback capabilities would require additional scripting and logic in your GitHub Actions workflow. This might involve:

- Separate jobs or steps for deploying the new revision, verifying its health, and shifting traffic.
- Manual approval steps for shifting traffic to the new revision.
- Scripts to monitor the health of the new revision and automatically rollback traffic if anomalies are detected post-deployment.

In your current setup, Cloud Run's managed deployments and automatic traffic shifting to healthy revisions provide a simplified and reliable deployment process that aligns well with the goals of blue-green deployments, focusing on minimizing downtime and ensuring service stability.
