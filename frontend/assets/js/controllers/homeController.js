import { getBills } from "../services/billingService.js";
import { getPatients } from "../services/patientService.js";

export async function initHomeController() {
  const app = document.getElementById("app");

  const bills = await getBills();
  const patients = await getPatients();

  patients.forEach(p => {
    const total = bills
      .filter(b => b.patient_id == p.id)
      .reduce((sum, b) => sum + Number(b.amount), 0);

    html += `
      <tr>
        <td>${p.name}</td>
        <td>${p.age}</td>
        <td>₹ ${total}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  app.innerHTML = html;
}