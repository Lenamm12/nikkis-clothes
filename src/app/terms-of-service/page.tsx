import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactPage from "../contact/page";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-foreground">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Agreement to Terms</h2>
          <p>By using Nikki&apos;s Clothes (&quot;Website&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Website.</p>

          <h2>2. Description of Service</h2>
          <p>Nikki&apos;s Clothes provides a platform for users to search for clothing items from the Nikki series games and access affiliate links to purchase these items. We do not sell items directly but link to third-party affiliate partners.</p>

          <h2>3. User Accounts</h2>
          <p>To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate and complete information when creating an account.</p>

          <h2>4. User Conduct</h2>
          <p>You agree not to use the Website for any unlawful purpose or in any way that could harm the Website or its users. Prohibited activities include, but are not limited to: harassment, uploading malicious content, and infringing on intellectual property rights.</p>
          
          <h2>5. Affiliate Links and Third-Party Websites</h2>
          <p>The Website contains links to third-party websites or services that are not owned or controlled by Nikki&apos;s Clothes. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that Nikki&apos;s Clothes shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.</p>
          <p>Purchases made through affiliate links are subject to the terms and conditions of the respective affiliate partners.</p>

          <h2>6. Intellectual Property</h2>
          <p>All content on the Website, including text, graphics, logos, and images (excluding game assets which belong to their respective owners), is the property of Nikki&apos;s Clothes or its licensors and is protected by copyright and other intellectual property laws. Game assets from the Nikki series are the property of their respective copyright holders (e.g., Papergames).</p>
          
          <h2>7. Disclaimers</h2>
          <p>The Website is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. Nikki&apos;s Clothes makes no warranties, express or implied, regarding the operation or availability of the Website or the information, content, or materials included therein.</p>
          
          <h2>8. Limitation of Liability</h2>
          <p>To the fullest extent permitted by applicable law, Nikki&apos;s Clothes shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the Website.</p>

          <h2>9. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on the Website. Your continued use of the Website after such changes constitutes your acceptance of the new Terms.</p>

          <h2>10. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us here:</p>

          <ContactPage/>
        </CardContent>
      </Card>
    </div>
  );
}
