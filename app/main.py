import flet as ft

def main(page: ft.Page):
    # 1. CONFIGURACIÓN DE ÉLITE (Look nativo, no web)
    page.title = "Neural Fit - AI"
    page.theme_mode = ft.ThemeMode.DARK
    page.bgcolor = "#050505" # Negro profundo
    page.padding = 0
    page.window_width = 400
    page.window_height = 800

    # 2. HEADER TECNOLÓGICO
    header = ft.Container(
        content=ft.Row([
            ft.Text("NEURAL AI v1.2", color="#39FF14", weight="bold", size=14)
        ], alignment=ft.MainAxisAlignment.CENTER),
        padding=20,
        bgcolor="#121212",
    )

    # 3. EL CUERPO DE LA APP (Dashboard dinámico)
    app_content = ft.Container(
        content=ft.Column([
            # Tarjeta de Recuperación (Estilo 55555.jpg)
            ft.Container(
                content=ft.Column([
                    ft.Text("ESTADO NEURAL", size=12, color="#39FF14", weight="bold"),
                    ft.Row([
                        ft.Column([
                            ft.Text("85%", size=35, weight="bold", color="white"),
                            ft.Text("ÓPTIMO", size=12, color="#39FF14"),
                        ]),
                        ft.Icon(ft.icons.BOLT, color="#39FF14", size=40)
                    ], alignment=ft.MainAxisAlignment.SPACE_BETWEEN),
                ]),
                padding=25,
                bgcolor="#121212",
                border_radius=25,
                border=ft.border.all(1, "rgba(255,255,255,0.05)"),
            ),

            ft.Divider(height=10, color="transparent"),

            # Grid de Escáner y Agua (Estilo 55454.PNG)
            ft.Row([
                ft.Container(
                    content=ft.Column([
                        ft.Icon(ft.icons.CAMERA_FRONT, color="#39FF14"),
                        ft.Text("ESCÁNER", size=14, weight="bold"),
                        ft.Text("BIOTIPO", color="grey", size=11),
                    ], horizontal_alignment=ft.CrossAxisAlignment.CENTER),
                    padding=20,
                    bgcolor="#121212",
                    border_radius=20,
                    expand=1,
                ),
                ft.Container(
                    content=ft.Column([
                        ft.Icon(ft.icons.WATER_DROP, color="#39FF14"),
                        ft.Text("HIDRATACIÓN", size=14, weight="bold"),
                        ft.Text("2.0L / 3L", color="grey", size=11),
                    ], horizontal_alignment=ft.CrossAxisAlignment.CENTER),
                    padding=20,
                    bgcolor="#121212",
                    border_radius=20,
                    expand=1,
                ),
            ], spacing=15),

            ft.Divider(height=20, color="transparent"),

            # BOTÓN DE ACCIÓN (Estilo 22.PNG)
            ft.Container(
                content=ft.Text("INICIAR ENTRENAMIENTO IA", color="black", weight="bold", size=16),
                alignment=ft.alignment.center,
                bgcolor="#39FF14",
                height=65,
                border_radius=35,
                on_click=lambda _: print("Iniciando IA..."),
            ),

        ], scroll=ft.ScrollMode.AUTO),
        expand=True,
        padding=20
    )

    # 4. BARRA DE NAVEGACIÓN INFERIOR
    nav_bar = ft.NavigationBar(
        destinations=[
            ft.NavigationDestination(icon=ft.icons.DASHBOARD_ROUNDED, label="Home"),
            ft.NavigationDestination(icon=ft.icons.FITNESS_CENTER, label="Entrenar"),
            ft.NavigationDestination(icon=ft.icons.PERSON_ROUNDED, label="Perfil"),
        ],
        bgcolor="#050505",
        selected_index=0,
    )

    # Unificar todo en la página
    page.add(header, app_content, nav_bar)

# Ejecutar la aplicación
if __name__ == "__main__":
    ft.app(target=main)
